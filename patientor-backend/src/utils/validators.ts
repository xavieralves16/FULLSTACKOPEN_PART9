import { z } from 'zod';
import { Gender } from '../types';

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),       
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export type NewPatient = z.infer<typeof newPatientSchema>;


import { Request, Response, NextFunction } from 'express';

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body); 
    next(); 
  } catch (error) {
    next(error); 
  }
};