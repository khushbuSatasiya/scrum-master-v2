export interface IUserInfoArr {
  label: string;
  value: string;
  content: any;
}
export interface IProjectArray {
  id: string;
  projectName: string;
  isAssigned: boolean;
}

export interface IUserDetail {
  userId: string;
  token: string;
  avtar: string;
  email: string;
  bio: string;
  realName: string;
  joiningDate: string;
  experience: number;
  projectCount: number;
}

export interface IActionTime {
  inTime: string;
  outTime: string;
}

export interface IEnteredTask {
  id: string;
  projectId: string;
  date: string;
  taskCreate: string;
  taskDone: string;
  projectDetails: ProjectDetails;
}

export interface ProjectDetails {
  projectName: string;
}

export interface IPersonalDetails {
  id: string;
  realName: string;
  email: string;
  designation: string;
  avatar: string;
  birthDate: string;
  joiningDate: string;
  confirmationDate: string;
  probationCompletionDate: any;
  paidLeaveStartDate: string;
}


export interface ITeamDetails{
	id: string
	name: string
	avatar: string
	designation: string
}

export interface IHolidayList{
	id: string
	leaveDate: string
	day: string
	reason: string
}