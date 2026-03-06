import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

interface Props {
  onSubmit: (values: any) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [type, setType] = useState("HealthCheck");

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");

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
      specialist
    };

    if (type === "HealthCheck") {
      entry.healthCheckRating = Number(healthCheckRating);
    }

    if (type === "Hospital") {
      entry.discharge = {
        date: dischargeDate,
        criteria: dischargeCriteria
      };
    }

    if (type === "OccupationalHealthcare") {
      entry.employerName = employerName;

      if (sickStart && sickEnd) {
        entry.sickLeave = {
          startDate: sickStart,
          endDate: sickEnd
        };
      }
    }

    onSubmit(entry);

    // reset
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("0");
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickStart("");
    setSickEnd("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 500 }}>

        <FormControl>
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={type}
            label="Entry Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              OccupationalHealthcare
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        {type === "HealthCheck" && (
          <TextField
            label="Health Rating (0-3)"
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
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
              placeholder="YYYY-MM-DD"
              value={sickStart}
              onChange={({ target }) => setSickStart(target.value)}
            />

            <TextField
              label="Sick Leave End"
              placeholder="YYYY-MM-DD"
              value={sickEnd}
              onChange={({ target }) => setSickEnd(target.value)}
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