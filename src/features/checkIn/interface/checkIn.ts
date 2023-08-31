export interface IProject {
  label: string;
  value: string;
}

export interface ICheckInValues {
  time: string;
  employees: IEmployee[];
}

export interface IEmployee {
  task: string;
  project: string;
}
