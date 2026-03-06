import { Patient, Gender } from '../types';

const data: Patient[] = [
  {
    id: "1",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: Gender.Male,
    occupation: "New York City cop",
    entries: [
      {
        id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
        date: "2015-01-02",
        type: "Hospital",
        specialist: "MD House",
        description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        diagnosisCodes: ["S62.5"],
        discharge: {
          date: "2015-01-16",
          criteria: "Thumb has healed."
        }
      }
    ]
  }
];


export default data;