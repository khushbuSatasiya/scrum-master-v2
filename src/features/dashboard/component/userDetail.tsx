import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import { Button, Flex, Image, Menu, Paper, Space, Tabs, Text, ThemeIcon, Tooltip, createStyles } from '@mantine/core';
import { IconDots, IconExternalLink, IconMail, IconUserStar } from '@tabler/icons-react';

import { getTotalWorkingHourColor } from 'shared/util/utility';

import { IHolidayList, ITeamDetails, IUserDetail, IUserInfoArr } from '../interface/dashboard';
import { DotIcon } from 'shared/icons/icons';
import { colorMap } from 'shared/constants/constants';

import { LEAVE_DETAILS } from '../constant/constant';
import TeamDetails from './teamDetails';
import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';

import '../style/dashboard.scss';
import HolidayList from './holidayList';
import MenuList from './menuList';

interface IProps {
	activeTab: string;
	USER_INFO_ARR: IUserInfoArr[];
	newToken: IUserDetail;
	totalWorkingHour: string;
	leaveDetails: Record<string, any>;
	setIsShowUserDetails: (action: boolean) => void;
	isShowUserDetails: boolean;
	calendarIndicator: string[];
}

const UserDetail: FC<IProps> = (props: IProps) => {
	const {
		USER_INFO_ARR,
		activeTab,
		newToken,
		totalWorkingHour,
		leaveDetails,
		setIsShowUserDetails,
		isShowUserDetails,
		calendarIndicator
	} = props;

	const [teamInfo, setTeamInfo] = useState<ITeamDetails[]>();
	const [teamLoading, setTeamLoading] = useState(false);
	const [holidayList, setHolidayList] = useState<IHolidayList[]>([]);
	const [holidayLoading, setHolidayLoading] = useState(false);

	const renderPaper = (label, value, color) => {
		return (
			<Paper
				sx={{
					border: '1px dashed #DBDFE9',
					borderRadius: '10px',
					width: '125px',
					padding: '6px 10px'
				}}
			>
				<Text fw='bold' fz='22px' c={'#071437'}>
					{value || '0'}
				</Text>
				{label === 'Compensation' || label === 'Paid Leave' || label === 'Vacational' ? (
					<Tooltip
						label={`${
							label === 'Compensation'
								? 'We have calculated the approximate compensation and not calculated anywhere. For further details, please reach out to the HR department.'
								: 'Used / Granted'
						}`}
						sx={{
							maxWidth: '250px',
							wordWrap: 'break-word',
							textWrap: 'balance',
							whiteSpace: 'normal',
							textAlign: 'center'
						}}
						inline
						position='bottom'
						color='#1c7ed6'
						transitionProps={{
							transition: 'slide-down',
							duration: 300
						}}
					>
						<Text c={color} fw='500' fz='sm'>
							{label}
						</Text>
					</Tooltip>
				) : (
					<Text c={`${label === 'Remaining' && value < 0 ? 'red' : color}`} fw='500' fz='sm'>
						{label}
					</Text>
				)}
			</Paper>
		);
	};

	const totalExperience = newToken?.experience / 365;

	/* API call to get Team list */
	const getTeamInfo = useCallback(() => {
		setTeamLoading(true);
		httpService
			.get(`${API_CONFIG.path.teamInfo}`)
			.then((res) => {
				setTeamInfo(res.data);
				setTimeout(() => {
					setTeamLoading(false);
				}, 200);
			})
			.catch((error) => {
				console.error('Error', error);
				setTeamLoading(false);
			});
	}, []);

	/* API call to get holiday List */
	const getHolidayList = useCallback(() => {
		setHolidayLoading(true);
		httpService
			.get(`${API_CONFIG.path.holidayList}`)
			.then((res) => {
				setHolidayList(res.data);
				setTimeout(() => {
					setHolidayLoading(false);
				}, 200);
			})
			.catch((error) => {
				setHolidayLoading(false);
				console.error('Error', error);
			});
	}, []);

	useEffect(() => {}, []);

	return (
		<Paper shadow='sm' radius='lg' m={'20px 20px 10px'} p='30px 30px 0px' pos={'relative'}>
			<Flex>
				<Image maw={160} radius='md' src={newToken?.avtar ?? newToken?.avtar} alt={newToken?.realName} />
				<Space w='xl' />

				<Flex direction='column'>
					<Text fw='600' color='#071437' fz='xl'>
						<span>{newToken?.realName ? newToken.realName : '-'}</span>
					</Text>
					<Flex mt={5} direction='row' justify='start' align='center'>
						<IconUserStar size='16' color='#B5B5C3' />
						<Space w='5px' />
						<Text fz='14px' fw={500} c='#B5B5C3'>
							{newToken?.bio ? newToken?.bio : 'Team Member'}
						</Text>
						<Space w='xl' />
						<IconMail size={16} color='#B5B5C3' />
						<Space w='5px' />
						<Text fz='14px' fw={500} c='#B5B5C3'>
							{newToken?.email ? newToken?.email : '-'}
						</Text>
					</Flex>
					<Space h='lg' />
					<Flex gap='lg'>
						<Paper
							sx={{
								border: '1px dashed #DBDFE9',
								borderRadius: '10px',
								width: '125px',
								padding: '6px 10px'
							}}
						>
							<Text fw='bold' fz='22px' c={'#071437'}>
								{newToken?.projectCount || 0}
							</Text>
							<Text c='#B5B5C3' fz='sm' fw={500}>
								Projects
							</Text>
						</Paper>
						<Paper
							sx={{
								border: '1px dashed #DBDFE9',
								borderRadius: '10px',
								width: '125px',
								padding: '6px 10px'
							}}
						>
							<Text fw='bold' fz='22px' c={'#071437'}>
								{totalExperience ? totalExperience.toFixed(1) : 0}
								<span
									style={{
										color: '#B5B5C3',
										fontWeight: '500',
										fontSize: '14px'
									}}
								>
									{' '}
									Year
								</span>
							</Text>
							<Text c='#B5B5C3' fz='sm' fw={500}>
								With us
							</Text>
						</Paper>
						{!isEmpty(totalWorkingHour) && (
							<Paper
								sx={{
									border: '1px dashed #DBDFE9',
									borderRadius: '10px',
									width: '125px',
									padding: '6px 10px'
								}}
							>
								<Text fw='bold' fz='22px' color='#071437'>
									{totalWorkingHour ? totalWorkingHour : '-'}
								</Text>
								<Text color={getTotalWorkingHourColor(totalWorkingHour)} fw='500' fz='sm'>
									Working Hours
								</Text>
							</Paper>
						)}
						{!isEmpty(leaveDetails) &&
							LEAVE_DETAILS(leaveDetails).map(({ label, value, color }, index) => {
								return (
									<Fragment key={index}>
										{label === 'Vacational' &&
											leaveDetails.vacationLeaves > 0 &&
											renderPaper(label, value, color)}
										{label !== 'Vacational' && renderPaper(label, value, color)}
									</Fragment>
								);
							})}
						{!isEmpty(calendarIndicator) &&
							calendarIndicator.map((item, index) => {
								return (
									<Paper
										sx={{
											border: '1px dashed #DBDFE9',
											borderRadius: '10px',
											width: '145px',
											padding: '6px 10px'
										}}
										key={index}
									>
										<Text fw='bold' fz='22px' color='#071437'>
											<DotIcon fill={colorMap[item] || 'defaultColor'} />
										</Text>
										<Text fw='500' fz='sm' c={'#B5B5C3'}>
											{item}
										</Text>
									</Paper>
								);
							})}
					</Flex>
				</Flex>
			</Flex>

			<MenuList
				isShowUserDetails={isShowUserDetails}
				setIsShowUserDetails={setIsShowUserDetails}
				getTeamInfo={getTeamInfo}
				getHolidayList={getHolidayList}
			/>

			<Tabs.List sx={{ borderBottom: '1px solid transparent' }} mt='20px'>
				{USER_INFO_ARR.map(({ label, value }, index) => {
					return (
						<Tabs.Tab
							sx={{
								color: `${activeTab === value ? '#3E97FF !important' : '#99A1B7'} `,
								borderColor: `${activeTab === value ? '#3E97FF !important' : ''} `,
								fontSize: '14px',
								fontWeight: 'bold',
								paddingBottom: '13px'
							}}
							value={value}
							key={index}
						>
							{label}
						</Tabs.Tab>
					);
				})}
			</Tabs.List>

			{!isEmpty(teamInfo) && (
				<TeamDetails
					teamInfo={teamInfo}
					onClose={() => setTeamInfo({} as ITeamDetails[])}
					teamLoading={teamLoading}
				/>
			)}

			{!isEmpty(holidayList) && (
				<HolidayList
					holidayList={holidayList}
					onClose={() => setHolidayList({} as IHolidayList[])}
					holidayLoading={holidayLoading}
				/>
			)}
		</Paper>
	);
};

export default UserDetail;
