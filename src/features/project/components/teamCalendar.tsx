import React, { FC, useCallback } from 'react';

import { Box, Divider, Flex, Group, Modal, Text } from '@mantine/core';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { DotIcon } from 'shared/icons/icons';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ICalendarInfo } from 'features/calendar/interface/calendar.interface';

import CustomToolbar from 'shared/components/customToolbar/customToolbar';

import '../style/project.scss';

interface IProps {
	calendarInfo: ICalendarInfo[];
	getTeamReport: (projectId: string, month: string) => void;
	projectId: string;
	setIsShowCalendar: (action: boolean) => void;
	projectName: string;
}

const TeamCalendar: FC<IProps> = ({ calendarInfo, getTeamReport, projectId, setIsShowCalendar, projectName }) => {
	const localizer = momentLocalizer(moment);

	const eventPropGetter = useCallback((event, start, end, isSelected) => {
		const backgroundColor = event.type === 'Holiday' ? 'green' : 'transparent';
		const color = event.type === 'Holiday' ? 'white' : 'black';
		return {
			style: {
				backgroundColor,
				color
			}
		};
	}, []);

	const handleNavigate = (newDate) => {
		const month = newDate.getMonth() + 1;
		getTeamReport(projectId, month);
	};

	return (
		<Group pos={'relative'}>
			<Modal
				shadow='sm'
				size={'1200px'}
				pos={'relative'}
				centered
				padding={20}
				radius='lg'
				withCloseButton={false}
				opened={true}
				onClose={() => setIsShowCalendar(false)}
			>
				<Text ta='center' c={'#071437'} fz={26} fw={600}>
					Calendar
				</Text>
				<Text ta='center' c={'#99A1B7'} fz={16} fw={600} pos={'absolute'} top={32} right={95}>
					{projectName}
				</Text>
				<Divider variant='dashed' mb={20} mt={10} />
				<Box>
					<Flex wrap={'wrap'} justify={'center'} align={'center'} m={'0 auto'} w={'100%'}>
						<Calendar
							popup={true}
							localizer={localizer}
							events={calendarInfo}
							views={['month']}
							startAccessor='start'
							endAccessor='end'
							style={{ height: 650, width: 1000 }}
							titleAccessor='title'
							eventPropGetter={eventPropGetter}
							tooltipAccessor={(event: any) => {}}
							onNavigate={(date, view) => handleNavigate(date)}
							className='team'
							components={{
								toolbar: CustomToolbar
							}}
						/>
					</Flex>
					<Flex
						sx={{
							flexDirection: 'column',
							position: 'absolute',
							top: 85,
							left: 100
						}}
					>
						<Flex align={'center'} mb={3}>
							<Flex align={'center'} w={125}>
								<DotIcon fill='yellow' height='10' />
								<Text fz={12} ml={2}>
									First Half leave
								</Text>
							</Flex>
							<Flex align={'center'}>
								<DotIcon fill='red' height='10' />
								<Text fz={12} ml={2}>
									Full leave
								</Text>
							</Flex>
						</Flex>
						<Flex align={'center'}>
							<Flex align={'center'} w={125}>
								<DotIcon fill='orange' height='10' />
								<Text fz={12} ml={2}>
									Second Half leave
								</Text>
							</Flex>
							<Flex align={'center'}>
								<DotIcon fill='blue' height='10' />
								<Text fz={12} ml={2}>
									WFH
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Box>
			</Modal>
		</Group>
	);
};

export default TeamCalendar;
