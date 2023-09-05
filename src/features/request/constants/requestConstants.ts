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
        color: '#071437',
        fontWeight: 500,
    },
    content: {
        //height: '320px',
    },
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

export { useStyles, LEAVE_DURATION, LEAVE_TYPE };
