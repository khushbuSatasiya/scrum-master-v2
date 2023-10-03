import React, { FC } from 'react';

import { Badge, Box, Divider, Flex, Group, Image, Paper, Space, Text, TextInput, Tooltip } from '@mantine/core';
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react';
import moment from 'moment';

import { dateFormate } from 'shared/util/utility';

import { IAction, ILeaveData } from '../interface/action.interface';

interface IProps {
	leaveData: ILeaveData[];
	setLeaveData: (data: ILeaveData[]) => void;
	setSelectedItem: (data: ILeaveData) => void;
	setAction: (data: IAction) => void;
}

const LeaveAction: FC<IProps> = ({ leaveData, setLeaveData, setSelectedItem, setAction }) => {
	return (
		<>
			{leaveData.map((item, index) => {
				const {
					realName,
					avatar,
					requestApplyDate,
					projectName,
					fromDate,
					toDate,
					duration,
					totalDay,
					leaveCode,
					leaveType,
					myStatus,
					leadNote,
					status,
					reason
				} = item;
				return (
					<Paper key={index}>
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
								<Text fz={'sm'} fw={600} color='#B5B5C3'>
									{projectName}
								</Text>
							</Flex>
						</Flex>

						<Flex>
							<Box sx={{ width: '25%', marginTop: '20px' }}>
								<Box display={'flex'} sx={{ justifyContent: 'space-between', width: '100%' }}>
									<Box sx={{ width: '50%' }}>
										<Text color='' fw={600} fz={'14px'}>
											From
										</Text>
										<Badge size='lg' radius='md'>
											{dateFormate(fromDate)}
										</Badge>
									</Box>
									<Box sx={{ width: '50%' }}>
										<Text fz={'14px'} fw={600}>
											To
										</Text>
										<Badge size='lg' radius='md'>
											{dateFormate(toDate)}
										</Badge>
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
									<Box sx={{ width: '50%' }}>
										<Text color='' fw={600} fz={'14px'}>
											Duration
										</Text>
										<Text fz='14px' color='#B5B5C3' fw={600}>
											{' '}
											{duration}
										</Text>
									</Box>
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

							<Box sx={{ width: '25%', marginTop: '20px', marginLeft: '50px' }}>
								<Flex justify={'space-between'} sx={{ width: '100%' }}>
									<Box sx={{ width: '50%' }}>
										<Text fw={600} fz={'14px'}>
											Leave Type
										</Text>
										<Text fw='600' fz='14px' color='#40c057'>
											{leaveType}
										</Text>
									</Box>
									<Box sx={{ width: '50%' }}>
										<Text color='' fz={'14px'} fw={600}>
											Leave Code
										</Text>
										<Text color='#228be6' fz='14px' fw={600}>
											{leaveCode}
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
											label: { fontSize: '16px', fontWeight: 600 },
											error: { fontSize: '12px' }
										}}
										label='Notes'
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
