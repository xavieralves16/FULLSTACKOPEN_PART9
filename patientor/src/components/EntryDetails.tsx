import { Diagnosis, Entry } from "../types";
import { Card, CardContent, Typography, Stack } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[]; 
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const cardStyle = { marginBottom: "15px", backgroundColor: "#f9f9f9" };

  const renderDiagnosisCodes = () => {
    if (!entry.diagnosisCodes) return null;
    return (
      <Stack direction="column" spacing={0.5} sx={{ mt: 1 }}>
        {entry.diagnosisCodes.map(code => {
          const diagnosis = diagnoses.find(d => d.code === code);
          return (
            <Typography key={code} variant="body2">
              {code} {diagnosis ? `- ${diagnosis.name}` : ""}
            </Typography>
          );
        })}
      </Stack>
    );
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Card style={cardStyle}>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalHospitalIcon color="error" />
              <Typography variant="h6">{entry.date}</Typography>
            </Stack>
            <Typography sx={{ mt: 1 }}>{entry.description}</Typography>
            <Typography sx={{ fontStyle: "italic", mt: 1 }}>
              Discharge: {entry.discharge.date} - {entry.discharge.criteria}
            </Typography>
            {renderDiagnosisCodes()}
          </CardContent>
        </Card>
      );

    case "OccupationalHealthcare":
      return (
        <Card style={cardStyle}>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center">
              <WorkIcon color="primary" />
              <Typography variant="h6">{entry.date} - {entry.employerName}</Typography>
            </Stack>
            <Typography sx={{ mt: 1 }}>{entry.description}</Typography>
            {entry.sickLeave && (
              <Typography sx={{ fontStyle: "italic", mt: 1 }}>
                Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
              </Typography>
            )}
            {renderDiagnosisCodes()}
          </CardContent>
        </Card>
      );

    case "HealthCheck":
      return (
        <Card style={cardStyle}>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center">
              <FavoriteIcon color="success" />
              <Typography variant="h6">{entry.date}</Typography>
            </Stack>
            <Typography sx={{ mt: 1 }}>{entry.description}</Typography>
            <Typography sx={{ fontWeight: "bold", mt: 1 }}>
              Health rating: {entry.healthCheckRating}
            </Typography>
            {renderDiagnosisCodes()}
          </CardContent>
        </Card>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;