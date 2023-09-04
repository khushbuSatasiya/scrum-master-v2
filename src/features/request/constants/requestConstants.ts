import { createStyles } from "@mantine/core";

//const REQUEST_ARR=[
//	{
//		name:'Request A Leave',
//		title1:' Please submit your leave request for approval.',
//		title2:'  Include dates and reason. Thank you!"',
//		onclick:()=>{

//		}
//	},
//	{
//		name:'Add Missing Day',
//		title1:'Please add the missing day to your schedule. Thank you!',
//		title2:''
//	},
//	{
//		name:'Change Time Request',
//		title1:'Please submit your change time request for us to process. Thank you!',
//		title2:''
//	},
//	{
//		name:'Work From Home',
//		title1:'Enjoy the flexibility of working from home and boost your productivity.',
//		title2:'Stay connected and thrive'
//	}
//]

const useStyles = createStyles(() => ({
	header: {
		padding: '0px',
	},
	close: {
		marginTop: '10px',
		marginRight: '15px',
	},
	label: {
		marginBottom: '5px',
		color: '#071437',
		fontWeight: 500,
	},
}));


const LEAVE_DURATION=[
	{
		label:'Full',value:'Full'
	},
	{
		label:'First Half',value:'First Half'
	},
	{
		label:'Second Half',value:'Second Half'
	}
]
const LEAVE_TYPE=[
	{
		label:'Paid',value:'Paid'
	},
	{
		label:'Vacational',value:'Vacational'
	},
	
	
]


export {useStyles ,LEAVE_DURATION,LEAVE_TYPE}