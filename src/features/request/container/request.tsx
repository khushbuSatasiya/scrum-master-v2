import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Flex, Paper, Text } from '@mantine/core';
import { isEmpty } from 'lodash';

import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { IProjectsProps } from 'features/project/interface/project';

import { IAddMissingDay, IChangeTimeSheet, ILeaveRequestProps, IUpComingLeave, IWfh } from '../interface/request';

import LeaveRequest from '../components/leaveRequest';
import ChangeTimeSheet from '../components/changeTimeSheet';
import AddMissingDay from '../components/addMissingDay';
import WorkFromHome from '../components/workFromHome';

const Request: FC<IProjectsProps> = ({ uId }) => {
	const [leaveRequest, setLeaveRequest] = useState({} as ILeaveRequestProps);
	const [changeTimeSheet, setChangeTimeSheet] = useState({} as IChangeTimeSheet);
	const [addMissingDay, setAddMissingDay] = useState({} as IAddMissingDay);
	const [workFromHome, setWorkFromHome] = useState({} as IWfh);
	const [isVacational, setIsVacational] = useState(false);
	const [isDisableDate, setIsDisableDate] = useState([]);
	const [isUpcomingLeave, setIsUpcomingLeave] = useState<IUpComingLeave[]>();

	const REQUEST_ARR = [
		{
			name: 'Leave Request',
			title1: ' SUBMIT YOUR LEAVE REQUEST FOR APPROVAL',
			onClick: () => {
				setLeaveRequest({
					startDay: null,
					endDay: null,
					duration: '',
					reason: '',
					leaveType: ''
				});
			}
		},

		{
			name: 'Change Time Request',
			title1: 'SUBMIT YOUR CHANGE TIME REQUEST FOR US TO PROCESS',
			onClick: () => {
				setChangeTimeSheet({
					date: null,
					changeTimeType: '',
					time: ''
				});
			}
		},
		{
			name: 'Add Missing Day',
			title1: 'SUBMIT YOUR MISSING DAY FOR APPROVAL',
			onClick: () => {
				setAddMissingDay({
					date: null,
					inTime: '',
					outTime: '',
					project: '',
					task: ''
				});
			}
		},
		{
			name: 'Work From Home',
			title1: 'SUBMIT YOUR WORK FROM HOME REQUEST FOR APPROVAL',
			onClick: () => {
				setWorkFromHome({
					startDate: '',
					endDate: '',
					reason: '',
					isConfirm: false
				});
			}
		}
	];
	//API call for getting Leave info
	const getLeaveRequestInfo = useCallback(() => {
		httpService
			.get(`${API_CONFIG.path.leaveRequest}/${uId}`)
			.then((res) => {
				setIsVacational(res.data.isVacational);
				setIsUpcomingLeave(res.data.upcomingLeave);
			})
			.catch((error) => {
				console.error('error', error);
			});
	}, [uId]);

	//APi call for getting Disable Date
	const getDateForChangeTimeSheet = useCallback(() => {
		httpService
			.get(`${API_CONFIG.path.changeTimeSheet}`)
			.then((res) => {
				setIsDisableDate(res.data.date);
			})
			.catch((error) => {
				console.error('error', error);
			});
	}, [uId]);

	useEffect(() => {
		getLeaveRequestInfo();
		getDateForChangeTimeSheet();
	}, []);

	return (
		<Flex wrap={'wrap'} w={'100%'} gap={10} justify={'space-between'}>
			{REQUEST_ARR.map(({ name, title1, onClick }, index) => {
				return (
					<Paper
						key={index}
						shadow='sm'
						radius='lg'
						mt={20}
						w={'49%'}
						p='lg'
						sx={{
							width: '100%',
							height: 'auto',
							scrollbarWidth: 'none',
							'::-webkit-scrollbar': {
								width: '0.5em',
								display: 'none'
							},
							'::-webkit-scrollbar-thumb': {
								backgroundColor: '#888'
							}
						}}
					>
						<Flex
							direction={'column'}
							align={'center'}
							justify={'space-evenly'}
							sx={{
								border: '1px dashed #228be6',
								background: '#F1FAFF',
								borderRadius: '16px',
								height: '130px'
							}}
							p={15}
						>
							<Text fz={12} fw={600} tt='uppercase' c={'#228be6'} ta={'center'}>
								{title1}
							</Text>

							<Button mt={10} onClick={onClick}>
								{name}
							</Button>
						</Flex>
					</Paper>
				);
			})}

			{!isEmpty(leaveRequest) && (
				<LeaveRequest
					onClose={() => setLeaveRequest({} as ILeaveRequestProps)}
					leaveRequest={leaveRequest}
					isOpen={!isEmpty(leaveRequest)}
					isVacational={isVacational}
					isUpcomingLeave={isUpcomingLeave}
					getLeaveRequestInfo={getLeaveRequestInfo}
				/>
			)}

			{!isEmpty(changeTimeSheet) && (
				<ChangeTimeSheet
					onClose={() => setChangeTimeSheet({} as IChangeTimeSheet)}
					changeTimeSheet={changeTimeSheet}
					isOpen={!isEmpty(changeTimeSheet)}
					isDisableDate={isDisableDate}
				/>
			)}

			{!isEmpty(addMissingDay) && (
				<AddMissingDay
					onClose={() => {
						setAddMissingDay({} as IAddMissingDay);
					}}
					isOpen={!isEmpty(addMissingDay)}
				/>
			)}

			{!isEmpty(workFromHome) && (
				<WorkFromHome
					onClose={() => {
						setWorkFromHome({} as IWfh);
					}}
					isOpen={!isEmpty(workFromHome)}
				/>
			)}
		</Flex>
	);
};

export default Request;
