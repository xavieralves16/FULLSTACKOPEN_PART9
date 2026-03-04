import express, { Response } from 'express';
import patientService from '../services/patientsService';
import { NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

export default router;