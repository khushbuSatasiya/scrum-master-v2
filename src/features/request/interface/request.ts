export interface ILeaveRequestProps{
	startDay:null,
	endDay:null,
	duration:string,
	reason:string
	leaveType:string

}

export interface ILeaveReviewProps {
	action: string
	startDate: string
	endDate: string
	totalDay: number
	duration: string
	leavetype: string
	reason: string
	isVacational: boolean
	totalSaturday: number
	totalSunday: number
	holiday: number
	message:string
  }
  