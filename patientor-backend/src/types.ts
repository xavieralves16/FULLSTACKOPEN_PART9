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

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;