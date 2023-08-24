import { Anchor, Text, createStyles } from '@mantine/core';

import { DeadLine } from 'shared/constants/constants';
import {
    dateFormate,
    getCheckInColor,
    getTotalWorkingHourColor,
} from 'shared/util/utility';

export const getUserTimesheetColumns = (renderModal) => {
    return [
        {
            accessor: 'date',
            title: 'Date',
            width: 100,
            render: ({ date }) => {
                return (
                    <Anchor sx={{ fontWeight: 500 }}>
                        {dateFormate(date)}
                    </Anchor>
                );
            },
        },
        {
            accessor: 'day',
            title: 'Day',
            width: 100,
            render: ({ day }) => {
                return <Text>{day}</Text>;
            },
        },

        {
            accessor: 'inTime',
            title: 'In',
            width: 120,
            render: ({ inTime, leave }) => {
                return (
                    <Text
                        color={`${
                            inTime
                                ? getCheckInColor(inTime, DeadLine.CHECK_IN)
                                : 'red'
                        }`}
                        fw={700}>
                        {inTime ? inTime : leave || <Text color='red'>-</Text>}
                    </Text>
                );
            },
        },
        {
            accessor: 'outTime',
            title: 'Out',
            width: 120,
            render: ({ outTime, remarks }) => {
                return (
                    <Text color={`${outTime ? 'green' : 'red'}`} fw={700}>
                        {outTime
                            ? outTime
                            : remarks || <Text color='red'>-</Text>}
                    </Text>
                );
            },
        },
        {
            accessor: 'totalHour',
            title: 'Total Hour',
            width: 120,
            render: ({ totalHour }) => {
                return (
                    <Text color={getTotalWorkingHourColor(totalHour)} fw={700}>
                        {totalHour || <Text color='red'>-</Text>}
                    </Text>
                );
            },
        },
        {
            accessor: 'tasks',
            title: 'Tasks',
            width: 100,
            render: renderModal,
        },
    ];
};

/* css for modal */

const useStyles = createStyles(() => ({
    title: {
        color: '#228be6',
        fontSize: '14px',
        fontWeight: 700,
        background: '#E7F5FF',
        padding: '10px',
        borderRadius: '10px',
    },
    header: {
        padding: '16px',
    },
    close: {
        outline: 'none',
    },
}));

export { useStyles };
