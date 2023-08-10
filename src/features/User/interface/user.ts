export interface IUserList {
	id: string;
	email: string;
	realName: string;
	avatar: string;
	isActive: string;
	isAdmin: string;
	birthDate: string;
	joiningDate: string;
	confirmationDate: string;
	probationCompletionDate: any;
	paidLeaveStartDate: string;
	userLeaveBalance: number;
	vacationalLeave: number;
	designation:string
}


export interface IUserInfo{
	id: string
	realName: string
	designation: string
	avatar: string
	projectCount: any
	experience: number
	email:string
}