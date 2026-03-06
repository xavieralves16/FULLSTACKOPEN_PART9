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


export default router;