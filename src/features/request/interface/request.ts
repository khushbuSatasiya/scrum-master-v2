export interface ILeaveRequestProps {
	startDay: null;
	endDay: null;
	duration: string;
	reason: string;
	leaveType: string;
}

export interface IChangeTimeSheet {
	date: Date;
	changeTimeType: string;
	time: string;
}

export interface IAddMissingDay {
	date: Date;
	inTime: string;
	outTime: string;
	project: string;
	task: string;
}

export interface ILeaveReviewProps {
	action: string;
	startDate: string;
	endDate: string;
	totalDay: number;
	duration: string;
	leavetype: string;
	reason: string;
	isVacational: boolean;
	totalSaturday: number;
	totalSunday: number;
	holiday: number;
	message: string;
}

export interface IUpComingLeave {
	date: string;
	leaveType: string;
}

export interface ITimeSheetData {
	date: Date;
	inTime: string;
	outTime: string;
}
