export interface Diagnosis {
  code: string;
  name: string;
  latin?: string; 
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const isPatientData = (obj: any): obj is Omit<Patient, 'id'> => {
  return obj &&
    isString(obj.name) &&
    isString(obj.dateOfBirth) &&
    isString(obj.ssn) &&
    isGender(obj.gender) &&
    isString(obj.occupation);
};


export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;