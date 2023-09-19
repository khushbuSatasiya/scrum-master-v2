import React, { FC } from 'react';

import { Button, Flex, Modal, Paper, Text } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

import Lottie from 'react-lottie';

import checkedJson from 'assets/lotties/checked.json';

import { ICheckInValues } from '../interface/checkIn';

interface IProps {
	isConfirm: boolean;
	setIsConfirm: (action: boolean) => void;
	confirmCheckIn: (values: ICheckInValues) => void;
	isAlreadyCheckIn: boolean;
	setIsAlreadyCheckIn: (action: boolean) => void;
	checkStatus: () => void;
	checkInValue: ICheckInValues;
	isLoading: boolean;
	setIsLoading: (action: boolean) => void;
	isSubmit: boolean;
	setIsSubmit: (action: boolean) => void;
	reminder: string;
}

const CheckInModal: FC<IProps> = (props: IProps) => {
	const {
		isConfirm,
		setIsConfirm,
		confirmCheckIn,
		isAlreadyCheckIn,
		setIsAlreadyCheckIn,
		checkStatus,
		checkInValue,
		isLoading,
		setIsLoading,
		isSubmit,
		setIsSubmit,
		reminder
	} = props;

	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: checkedJson
	};

	return (
		<>
			<Modal
				size='auto'
				opened={isConfirm}
				onClose={() => console.log()}
				centered
				padding={40}
				radius='lg'
				withCloseButton={false}
			>
				<Paper radius='lg'>
					<Flex align={'center'} direction={'column'}>
						<Flex justify='center' align='center' direction='column' mb={20}>
							<IconAlertTriangle size='120' color='Orange' />
						</Flex>
						<Text ta='center' mb={30} weight={600} color='#99A1B7'>
							Do you want to check in without adding tasks?
						</Text>
						<Flex>
							<Button
								variant='outline'
								mr={18}
								loading={isLoading}
								loaderPosition='left'
								loaderProps={{
									size: 'sm',
									color: '#15aabf',
									variant: 'oval'
								}}
								onClick={() => {
									confirmCheckIn(checkInValue);
									setIsConfirm(false);
								}}
							>
								Yes
							</Button>
							<Button
								variant='outline'
								color='red'
								onClick={() => {
									setIsConfirm(false);
									setIsLoading(false);
								}}
							>
								Cancel
							</Button>
						</Flex>
					</Flex>
				</Paper>
			</Modal>

			<Modal
				size='auto'
				opened={isAlreadyCheckIn}
				onClose={() => setIsAlreadyCheckIn(false)}
				centered
				padding={40}
				radius='lg'
				withCloseButton={false}
			>
				<Paper radius='lg'>
					<Flex align={'center'} direction={'column'}>
						<Flex justify='center' align='center' direction='column' mb={20}>
							<IconAlertTriangle size='120' color='Orange' />
						</Flex>
						<Text ta='center' mb={30} weight={600} color='#99A1B7'>
							You already check in
						</Text>

						<Button
							variant='outline'
							color='red'
							onClick={() => {
								setIsAlreadyCheckIn(false);
								checkStatus();
							}}
						>
							OK
						</Button>
					</Flex>
				</Paper>
			</Modal>

			<Modal
				size='auto'
				opened={isSubmit}
				onClose={() => console.log()}
				centered
				padding={40}
				radius='lg'
				withCloseButton={false}
			>
				<Paper radius='lg'>
					<Flex align={'center'} direction={'column'}>
						<Flex justify='center' align='center' direction='column' mb={20}>
							<Lottie options={defaultOptions} height={120} width={120} speed={1.5} />
						</Flex>
						<Text ta='center' mb={10} weight={600} color='#99A1B7'>
							You have successfully checked in
						</Text>
						{reminder && (
							<Text ta='center' mb={30} weight={600} color='#99A1B7'>
								Late coming reminder <span style={{ color: 'red' }}>{reminder}</span> in this month
							</Text>
						)}

						<Button
							variant='outline'
							color='green'
							onClick={() => {
								setIsSubmit(false);
								checkStatus();
							}}
						>
							OK
						</Button>
					</Flex>
				</Paper>
			</Modal>
		</>
	);
};

export default CheckInModal;
