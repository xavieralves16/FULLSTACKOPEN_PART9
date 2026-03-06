import { Patient, Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import EntryDetails from "../EntryDetails";
import { Button, Typography } from "@mui/material";

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

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>{patient.name}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>Entries</Typography>

      {patient.entries.length === 0 ? (
        <Typography>No entries yet</Typography>
      ) : (
        patient.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}

      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;