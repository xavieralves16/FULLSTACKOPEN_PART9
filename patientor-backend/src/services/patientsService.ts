import patientsData from '../data/patients';
import { Patient, NonSensitivePatient , isPatientData, Gender} from '../types';
import { v1 as uuid } from 'uuid';

let patients: Patient[] = patientsData.map(p => ({
  ...p,
  gender: p.gender as Gender 
}));

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

const addPatient = (patientData: any): Patient => {
  if (!isPatientData(patientData)) {
    throw new Error('Invalid patient data');
  }

  const newPatient: Patient = {
    id: uuid(),
    ...patientData
  };

  patients.push(newPatient); 
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  patients
};