import React, { FC } from 'react';

import { Flex, Modal, Paper, Text, Button } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

import { IAction, ILeaveData } from '../interface/action.interface';

interface IProps {
	action: IAction;
	setAction: (action: IAction) => void;
	leaveStatus: (selectedItem, status) => void;
	selectedItem: ILeaveData;
	isStatusLoading: boolean;
}

export const ActionModal: FC<IProps> = ({ action, setAction, leaveStatus, selectedItem, isStatusLoading }) => {
	return (
		<Modal
			opened={action.isAction}
			onClose={() =>
				setAction({
					...action,
					isAction: false
				})
			}
			centered
			radius='lg'
			withCloseButton={false}
		>
			<Paper radius='lg'>
				<Flex align={'center'} direction={'column'}>
					<Flex justify='center' align='center' direction='column' mb={20}>
						<IconAlertTriangle size='120' color={`${action.status === 'approve' ? 'Orange' : 'Red'}`} />
					</Flex>
					<Text ta='center' mb={30} weight={600} color='#99A1B7'>
						{`Are you sure you want to ${action.status === 'approve' ? 'approve' : 'reject'}?`}
					</Text>
					<Flex>
						<Button
							variant='outline'
							mr={18}
							loading={isStatusLoading}
							loaderPosition='left'
							loaderProps={{
								size: 'sm',
								color: '#15aabf',
								variant: 'oval'
							}}
							onClick={() => {
								setAction({
									...action,
									isAction: false
								});
								leaveStatus(selectedItem, action.status === 'approve' ? 'Approved' : 'Rejected');
							}}
						>
							Yes
						</Button>
						<Button
							variant='outline'
							color='red'
							onClick={() => {
								setAction({
									...action,
									isAction: false
								});
							}}
						>
							Cancel
						</Button>
					</Flex>
				</Flex>
			</Paper>
		</Modal>
	);
};
