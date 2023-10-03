export interface IAction {
	isAction: boolean;
	status: string;
	index: number;
}

export interface ILeaveData {
	realName: string;
	avatar: string;
	fromDate: string;
	toDate: string;
	totalDay: number;
	duration: string;
	leaveType: string;
	reason: string;
	status: string;
	leaveCode: number;
	requestApplyDate: string;
	myStatus: string;
	projectName: string;
	actionByLead: string;
	leadNote: string;
}
