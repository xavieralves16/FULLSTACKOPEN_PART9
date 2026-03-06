import { useState } from "react";
import { TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Box } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

interface Props {
  onSubmit: (values: Omit<Entry, "id">) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState<"HealthCheck" | "Hospital" | "OccupationalHealthcare">("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState("0");

  // Hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState("");
  const [sickStart, setSickStart] = useState("");
  const [sickEnd, setSickEnd] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    let entry: any = {
      type,
      description,
      date,
      specialist,
      diagnosisCodes
    };

    if (type === "HealthCheck") {
      entry.healthCheckRating = Number(healthCheckRating);
    } else if (type === "Hospital") {
      entry.discharge = {
        date: dischargeDate,
        criteria: dischargeCriteria
      };
    } else if (type === "OccupationalHealthcare") {
      entry.employerName = employerName;
      if (sickStart && sickEnd) {
        entry.sickLeave = {
          startDate: sickStart,
          endDate: sickEnd
        };
      }
    }

    onSubmit(entry);

    // reset form
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating("0");
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickStart("");
    setSickEnd("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ mt: 2 }}>

        <FormControl>
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            label="Entry Type"
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <FormControl>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((code) => (
                  <Chip key={code} label={code} size="small" />
                ))}
              </Box>
            )}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} - {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === "HealthCheck" && (
          <FormControl>
            <InputLabel>Health Rating</InputLabel>
            <Select
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
              label="Health Rating"
            >
              <MenuItem value="0">0 - Healthy</MenuItem>
              <MenuItem value="1">1 - Low Risk</MenuItem>
              <MenuItem value="2">2 - High Risk</MenuItem>
              <MenuItem value="3">3 - Critical Risk</MenuItem>
            </Select>
          </FormControl>
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Discharge Criteria"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick Leave Start"
              type="date"
              value={sickStart}
              onChange={({ target }) => setSickStart(target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Sick Leave End"
              type="date"
              value={sickEnd}
              onChange={({ target }) => setSickEnd(target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}

        <Button type="submit" variant="contained">
          Add Entry
        </Button>

      </Stack>
    </form>
  );
};

export default AddEntryForm;