import { createStyles } from '@mantine/core';

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
        color: '##252F4A',
        fontWeight: 500,
        fontSize: 14,
    },
    input: {
        color: '#4B5675',
        border: ' 0.0625rem solid F9F9F9',
        backgroundColor: '#F9F9F9',
        fontWeight: 500,
        height: '2.25rem',

        '&::placeholder': {
            color: '#99A1B7',
            fontWeight: 500,
        },
        '&:focus': {
            background: '#F1F1F2',
            borderColor: '#F1F1F2',
        },
    },
	error:{
		display:'none',
	},
	wrapper:{
		margin:'0px'
	}
}));

const LEAVE_DURATION = [
    {
        label: 'Full',
        value: 'Full',
    },
    {
        label: 'First Half',
        value: 'First Half',
    },
    {
        label: 'Second Half',
        value: 'Second Half',
    },
];
const LEAVE_TYPE = [
    {
        label: 'Paid',
        value: 'Paid',
    },
    {
        label: 'Vacational',
        value: 'Vacational',
    },
];

const  DURATION= [
	'First Half' ,
	'Second Half' 	
]

const CHANGE_TIMESHEET_TYPE=[
	{label:'In Time',
	value:'In'},
{
	label:'Out time',
	value:'Out'

}
]

export { useStyles, LEAVE_DURATION, LEAVE_TYPE ,DURATION ,CHANGE_TIMESHEET_TYPE} ;
