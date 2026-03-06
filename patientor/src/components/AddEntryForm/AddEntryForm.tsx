import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

interface Props {
  onSubmit: (values: any) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("0");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating)
    });

    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("0");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
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

        <TextField
          label="Health Rating (0-3)"
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />

        <Button type="submit" variant="contained">
          Add Entry
        </Button>
      </Stack>
    </form>
  );
};

export default AddEntryForm;