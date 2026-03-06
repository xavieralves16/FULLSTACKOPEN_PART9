import express, { Request, Response , NextFunction} from 'express';
import patientService from '../services/patientsService';
import { NonSensitivePatient , Patient} from '../types';
import { newPatientParser, NewPatient } from '../utils/validators';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post(
  '/',
  newPatientParser, 
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);

  if (!patient) {
    return res.status(404).send({ error: 'Patient not found' });
  }

  return res.json(patient);
});

const parseDiagnosisCodes = (object: unknown): Array<string> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) return [];
  return (object as any).diagnosisCodes as Array<string>;
};

import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const parseNewEntry = (data: any): Entry => {
  const base = {
    id: uuidv4(),
    date: data.date,
    description: data.description,
    specialist: data.specialist,
    diagnosisCodes: parseDiagnosisCodes(data),
  };

  switch (data.type) {
    case "Hospital":
      if (!data.discharge?.date || !data.discharge?.criteria) throw new Error("Missing discharge info for Hospital entry");
      return { ...base, type: "Hospital", discharge: data.discharge } as HospitalEntry;

    case "OccupationalHealthcare":
      if (!data.employerName) throw new Error("Missing employerName");
      return { ...base, type: "OccupationalHealthcare", employerName: data.employerName, sickLeave: data.sickLeave } as OccupationalHealthcareEntry;

    case "HealthCheck":
      if (data.healthCheckRating === undefined) throw new Error("Missing healthCheckRating");
      return { ...base, type: "HealthCheck", healthCheckRating: data.healthCheckRating } as HealthCheckEntry;

    default:
      throw new Error(`Invalid entry type: ${data.type}`);
  }
};

router.post('/:id/entries', (req: Request, res: Response) => {
  try {
    const patientId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const patient = patientService.getPatient(patientId);

    if (!patient) {
      return res.status(404).send({ error: "Patient not found" });
    }

    const newEntry = parseNewEntry(req.body);
    patient.entries.push(newEntry);

    return res.json(newEntry);
  } catch (e: unknown) {
    let message = "Something went wrong";
    if (e instanceof Error) message += `: ${e.message}`;
    return res.status(400).send({ error: message });
  }
});


export default router;