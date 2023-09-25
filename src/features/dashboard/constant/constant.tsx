import { Text } from '@mantine/core';
import { DataTableColumn } from 'mantine-datatable';
import { dateFormate } from 'shared/util/utility';

export const LEAVE_DETAILS = (leaveDetails) => {
	return [
		{
			label: 'Paid Leave',
			value: leaveDetails.usedLeaves + ' / ' + leaveDetails.grantedLeaves,
			color: '#40c057'
		},
		{
			label: 'Remaining',
			value: leaveDetails.remainingLeaves,
			color: '#40c057'
		},
		{
			label: 'Vacational',
			value: leaveDetails.usedVacationalLeave + ' / ' + leaveDetails.vacationLeaves,
			color: '#228be6'
		},
		{
			label: 'Compensation',
			value: leaveDetails.compensationLeaves,
			color: '#FF9B38'
		}
	];
};

export const getHolidayColumns = (): DataTableColumn<any>[] => {
	return [
		{
			accessor: 'leaveDate',
			title: 'Date',
			width: 150,
			render: ({ leaveDate, isUpcomingLeave }) => {
				return (
					<Text fw={500} c={isUpcomingLeave ? 'gray' : 'blue'}>
						{dateFormate(leaveDate)}
					</Text>
				);
			}
		},
		{
			accessor: 'day',
			title: 'Day',
			width: 150,
			render: ({ day, isUpcomingLeave }) => {
				return <Text c={isUpcomingLeave ? 'gray' : 'blue'}>{day}</Text>;
			}
		},
		{
			accessor: 'reason',
			title: 'Festival',
			width: 150,
			render: ({ isUpcomingLeave, reason }) => {
				return <Text c={isUpcomingLeave ? 'gray' : 'blue'}>{reason}</Text>;
			}
		}
	];
};
