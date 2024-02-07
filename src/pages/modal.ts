export interface IVoter {
  id: string;
  lastName: string;
  firstName: string;
  otherName: string;
  email: string;
  course: string;
  matricNo: string;
  level: string;
  registrationDate: number;
}

export interface ILevel {
  id: string;
  name: string;
}

export interface IDepartment {
  id: string;
  name: string;
}

export interface IElection {
  id: string;
  name: string;
  course: string[];
  level: string[];
  startDate: number;
  endDate: number;
  createdDate: number;
  candidates: ICandidate[];
}

export interface ICandidate {
  id: string;
  lastName: string;
  firstName: string;
  otherName: string;
  email: string;
  dateOfBirth: string;
  course: string;
  matricNo: string;
  level: string;
  registrationDate: string;
  counts: ICount[];
}

export interface IElectionRole {
  id: string;
  role: string;
}

export interface ICount {
  id: string;
  electionId: string;
  count: number;
}

export interface IAdmin {
  id: string;
  lastName: string;
  firstName: string;
  otherName: string;
  email: string;
  role: string;
  telephoneNo: string;
}

export interface IElectionForCreateElectionForm {
  name: string;
  course: string[];
  level: string[];
  startDate: number;
  endDate: number;
  createdDate: number;
}

export interface IStyle {
  labelstyle: React.CSSProperties;
}
