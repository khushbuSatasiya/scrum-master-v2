import React, { FC, useCallback, useEffect, useState } from 'react';

import isEmpty from 'lodash/isEmpty';

import { LoadingOverlay, Paper } from '@mantine/core';

import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import NoRecords from 'shared/components/noRecords/noRecords';

import { IAction, ILeaveData } from '../interface/action.interface';

import { ActionModal } from './actionModal';
import LeaveAction from './leaveAction';

const Action: FC = () => {
	const [action, setAction] = useState<IAction>({
		isAction: false,
		status: '',
		index: 0
	});
	const [leaveData, setLeaveData] = useState<ILeaveData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isStatusLoading, setIsStatusLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState<ILeaveData>({} as ILeaveData);

	const leadApproval = useCallback(async () => {
		setIsLoading(true);

		try {
			await httpService.get(API_CONFIG.path.leadApproval).then((res) => {
				setLeaveData(res.data);
				setIsLoading(false);
			});
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	}, []);

	const leaveStatus = useCallback(
		async (selectedItem, status) => {
			setIsStatusLoading(true);

			const params = { leaveCode: selectedItem.leaveCode, status, note: selectedItem.leadNote };
			try {
				await httpService.put(API_CONFIG.path.leaveStatus, params).then((res) => {
					setIsStatusLoading(false);
					let currentIndex = action.index;
					leaveData[currentIndex] = res.data;
				});
			} catch (error) {
				setIsStatusLoading(false);
				console.error(error);
			}
		},
		[action.index, leaveData]
	);

	useEffect(() => {
		leadApproval();
	}, [leadApproval]);

	return (
		<>
			{isLoading && (
				<LoadingOverlay
					loaderProps={{
						size: 'xl'
					}}
					visible={isLoading}
					overlayBlur={2}
				/>
			)}
			<Paper
				shadow='sm'
				radius='lg'
				h={600}
				sx={{
					margin: '20px 0px',
					padding: '25px',
					overflowY: 'scroll',
					height: 'auto',
					maxHeight: '650px',
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
				{!isEmpty(leaveData) && (
					<LeaveAction
						leaveData={leaveData}
						setLeaveData={setLeaveData}
						setSelectedItem={setSelectedItem}
						setAction={setAction}
					/>
				)}
				{isEmpty(leaveData) && !isLoading && <NoRecords />}
			</Paper>

			<ActionModal
				action={action}
				onClose={() => setAction({} as IAction)}
				leaveStatus={leaveStatus}
				selectedItem={selectedItem}
				isStatusLoading={isStatusLoading}
			/>
		</>
	);
};

export default Action;
