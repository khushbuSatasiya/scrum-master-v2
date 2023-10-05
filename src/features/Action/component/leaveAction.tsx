import React, { FC } from 'react';

import { Box, Divider, Flex, Group, Image, Paper, Space, Text, TextInput, Tooltip, createStyles } from '@mantine/core';
import { IconCalendar, IconThumbDown, IconThumbUp } from '@tabler/icons-react';
import moment from 'moment';

import { dateFormate } from 'shared/util/utility';

import { IAction, ILeaveData } from '../interface/action.interface';
import { DatePickerInput, DatePickerProps } from '@mantine/dates';

interface IProps {
	leaveData: ILeaveData[];
	setLeaveData: (data: ILeaveData[]) => void;
	setSelectedItem: (data: ILeaveData) => void;
	setAction: (data: IAction) => void;
}

const LeaveAction: FC<IProps> = ({ leaveData, setLeaveData, setSelectedItem, setAction }) => {
	const useStyles = createStyles(() => ({
		input: {
			border: ' 0.0625rem solid transparent',
			backgroundColor: 'transparent',
			fontWeight: 500,
			height: 'unset !important',
			minHeight: '1.25rem !important',
			left: '-10px',
			color: 'transparent',
			paddingLeft: '0px !important',
			padding: '0px 9px !important',

			'&:focus': {
				background: 'transparent',
				borderColor: 'transparent'
			}
		},
		day: {
			// cursor: 'not-allowed'
		}
	}));

	const { classes } = useStyles();

	// const getDayProps: DatePickerProps['getDayProps'] = (date) => {
	// 	if (date.getDate() === 13) {
	// 		return {
	// 			style: {
	// 				backgroundColor: 'var(--mantine-color-red-filled)',
	// 				color: 'var(--mantine-color-white)'
	// 			}
	// 		};
	// 	}

	// 	return {};
	// };

	return (
		<>
			{leaveData.map((item, index) => {
				const {
					realName,
					requestDate,
					avatar,
					requestApplyDate,
					projectName,
					fromDate,
					toDate,
					duration,
					totalDay,
					code,
					leaveType,
					myStatus,
					leadNote,
					status,
					reason,
					requestType
				} = item;

				return (
					<Paper key={index}>
						{/* <Text color='grey' fw='700' fz='md' ta={'center'}>
							{requestType === 'wfh' ? 'WFH Request' : 'Leave Request'}
						</Text> */}

						<Flex justify={'space-between'}>
							<Flex align={'center'} justify={'space-between'}>
								<Image maw={50} radius='md' src={avatar ?? avatar} alt={realName} />
								<Space w='sm' />
								<Flex direction={'column'}>
									<Text color='#3F4254' fw='700' fz='xl'>
										{realName}
									</Text>
									<Text fz={'sm'} fw={600} color='#B5B5C3'>
										{moment(requestApplyDate).fromNow()}
									</Text>
								</Flex>
							</Flex>
							<Flex>
								<Text fz={'sm'} fw={700} color='#B5B5C3'>
									{projectName}
								</Text>
							</Flex>
						</Flex>

						<Flex>
							<Box sx={{ width: '25%', marginTop: '20px' }}>
								<Box
									display={'flex'}
									sx={{ justifyContent: 'space-between', width: '100%' }}
									pos={'relative'}
								>
									<Box sx={{ width: '50%' }}>
										<Text color='' fw={600} fz={'14px'}>
											From
										</Text>
										<Text fw={600} fz={'14px'} c={'blue'}>
											{dateFormate(fromDate)}
										</Text>
									</Box>
									<Box sx={{ cursor: 'pointer' }}>
										<DatePickerInput
											icon={
												<Group pos={'absolute'} left={2} bottom={8}>
													<IconCalendar size='20px' stroke={1.5} />
												</Group>
											}
											sx={{ borderColor: 'transparent', paddingLeft: 0 }}
											pos={'absolute'}
											left={'33%'}
											bottom={'-12%'}
											classNames={{
												input: classes.input,
												day: classes.day
											}}
											excludeDate={(date) => {
												const datesArray = requestDate.map((item) =>
													moment(item).format('YYYY-MM-DD')
												);
												const formattedDate = moment(date).format('YYYY-MM-DD');

												const updateDate = datesArray.includes(formattedDate);
												return !updateDate;
											}}
											defaultValue={new Date(fromDate)}
											getDayProps={(date) => {
												const datesArray = requestDate.map((item) =>
													moment(item).format('YYYY-MM-DD')
												);
												if (datesArray.includes(moment(date).format('YYYY-MM-DD'))) {
													console.log('datesArray:', datesArray);
													return {
														style: {
															backgroundColor: '#228be6',
															color: 'white'
														}
													};
												}

												return {};
											}}
										/>
									</Box>

									{/* <DatePicker /> */}

									<Box sx={{ width: '50%' }}>
										<Text fz={'14px'} fw={600}>
											To
										</Text>
										<Text fw={600} fz={'14px'} c={'blue'}>
											{dateFormate(toDate)}
										</Text>
									</Box>
								</Box>
								<Flex
									display={'flex'}
									sx={{
										justifyContent: 'space-between',
										width: '100%',
										marginTop: '15px'
									}}
								>
									{requestType === 'leave' ? (
										<Box sx={{ width: '50%' }}>
											<Text color='' fw={600} fz={'14px'}>
												Duration
											</Text>
											<Text fz='14px' color='#B5B5C3' fw={600}>
												{duration}
											</Text>
										</Box>
									) : (
										<Box sx={{ width: '50%' }}>
											<Text fw={600} fz={'14px'}>
												Reason
											</Text>
											<Tooltip
												sx={{
													maxWidth: '200px',
													wordWrap: 'break-word',
													textWrap: 'balance',
													height: 'auto',
													textAlign: 'center'
												}}
												inline
												position='top-start'
												label={reason}
												color='#1c7ed6'
												transitionProps={{
													transition: 'slide-down',
													duration: 300
												}}
											>
												<Text fz='14px' color='#B5B5C3' fw={600} truncate>
													{reason}
												</Text>
											</Tooltip>
										</Box>
									)}

									<Box sx={{ width: '50%' }}>
										<Text color='' fz={'14px'} fw={600}>
											Total Work Day
										</Text>
										<Text size='lg' fz='14px' fw={600} color='#228be6'>
											{totalDay}
										</Text>
									</Box>
								</Flex>
							</Box>

							<Box sx={{ width: '25%', marginTop: '20px', marginLeft: '25px' }}>
								<Flex justify={'space-between'} sx={{ width: '100%' }}>
									{requestType === 'leave' && (
										<Box sx={{ width: '50%' }}>
											<Text fw={600} fz={'14px'}>
												Leave Type
											</Text>
											<Text fw='600' fz='14px' color='#40c057'>
												{leaveType}
											</Text>
										</Box>
									)}

									<Box sx={{ width: '50%' }}>
										<Text color='' fz={'14px'} fw={600}>
											{requestType === 'wfh' ? 'WFH Code' : 'Leave Code'}
										</Text>
										<Text color='#228be6' fz='14px' fw={600}>
											{code}
										</Text>
									</Box>
								</Flex>
								<Flex
									justify={'space-between'}
									mt={'15px'}
									sx={{
										width: '100%'
									}}
								>
									<Box sx={{ width: '50%' }}>
										<Text fw={600} fz={'14px'}>
											Status
										</Text>
										<Text fw='600' fz='14px' color='#ffb703'>
											{status}
										</Text>
									</Box>
									{requestType === 'leave' && (
										<Box sx={{ width: '50%' }}>
											<Text fw={600} fz={'14px'}>
												Reason
											</Text>
											<Tooltip
												sx={{
													maxWidth: '200px',
													wordWrap: 'break-word',
													textWrap: 'balance',
													height: 'auto',
													textAlign: 'center'
												}}
												inline
												position='top-start'
												label={reason}
												color='#1c7ed6'
												transitionProps={{
													transition: 'slide-down',
													duration: 300
												}}
											>
												<Text fz='14px' color='#B5B5C3' fw={600} truncate>
													{reason}
												</Text>
											</Tooltip>
										</Box>
									)}
								</Flex>
							</Box>

							<Flex
								direction={'column'}
								align={'flex-end'}
								sx={{
									width: '50%'
								}}
							>
								<Box sx={{ width: '60%' }}>
									<TextInput
										styles={{
											label: { fontSize: '14px', fontWeight: 600, color: '#717981' },
											error: { fontSize: '12px' }
										}}
										label={`${requestType === 'wfh' ? 'WFH Note' : 'Leave Note'}`}
										defaultValue={leadNote !== null ? leadNote : ''}
										radius='md'
										placeholder='Write Something'
										sx={{ width: '100%' }}
										onChange={(e) => {
											const tmpData = leaveData;
											leaveData[index].leadNote = e.target.value;
											setLeaveData(tmpData);
										}}
										readOnly={
											(myStatus === 'Approved' || myStatus === 'Rejected') && leadNote !== null
										}
										disabled={
											(myStatus === 'Approved' || myStatus === 'Rejected') && leadNote !== null
										}
									/>
									<Group mt={'20px'} display={'flex'} sx={{ flexDirection: 'row' }}>
										{myStatus === 'Approved' || myStatus === 'Rejected' ? (
											<Text
												fz='14px'
												color={`${myStatus === 'Approved' ? 'green' : 'red'}`}
												fw={600}
												truncate
											>
												{myStatus} by you
											</Text>
										) : (
											<>
												<IconThumbUp
													size={38}
													strokeWidth={2}
													color={'green'}
													cursor={'pointer'}
													onClick={() => {
														setAction({
															isAction: true,
															status: 'approve',
															index: index
														});
														setSelectedItem(item);
													}}
												/>

												<IconThumbDown
													size={38}
													strokeWidth={2}
													color={'red'}
													cursor={'pointer'}
													onClick={() => {
														setAction({
															isAction: true,
															status: 'reject',
															index: index
														});
														setSelectedItem(item);
													}}
												/>
											</>
										)}
									</Group>
								</Box>
							</Flex>
						</Flex>

						<Divider my='sm' variant='dashed' sx={{ margin: '20px 0 !important' }} />
					</Paper>
				);
			})}
		</>
	);
};

export default LeaveAction;
