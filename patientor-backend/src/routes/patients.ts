import express, { Request, Response } from 'express';
import patientService from '../services/patientsService';
import { NonSensitivePatient , Patient} from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req: Request, res: Response<Patient | { error: string }>) => {
  try {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send({ error: 'Invalid patient data' });
  }
});

export default router;