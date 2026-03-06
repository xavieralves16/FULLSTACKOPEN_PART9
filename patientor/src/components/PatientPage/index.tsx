import { Patient, Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import EntryDetails from "../EntryDetails";
import { Typography } from "@mui/material";
import AddEntryForm from "../AddEntryForm/AddEntryForm";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const data = await patientService.getById(id);
        setPatient(data);
      }
    };
    void fetchPatient();
  }, [id]);

  const submitEntry = async (values: any) => {
    if (!id || !patient) return;

    try {
      const newEntry = await patientService.addEntry(id, values);

      setPatient({
        ...patient,
        entries: patient.entries.concat(newEntry)
      });

    } catch (e) {
      console.error(e);
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {patient.name}
      </Typography>

      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      <Typography variant="h5" sx={{ mt: 3 }}>
        Add New Entry
      </Typography>

      <AddEntryForm onSubmit={submitEntry} diagnoses={diagnoses} />

      <Typography variant="h5" sx={{ mt: 3 }}>
        Entries
      </Typography>

      {patient.entries.length === 0 ? (
        <Typography>No entries yet</Typography>
      ) : (
        patient.entries.map(entry => (
          <EntryDetails
            key={entry.id}
            entry={entry}
            diagnoses={diagnoses}
          />
        ))
      )}
    </div>
  );
};

export default PatientPage;