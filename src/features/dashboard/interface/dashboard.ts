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
