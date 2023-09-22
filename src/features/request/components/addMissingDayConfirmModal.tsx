import React, { FC } from 'react';

import { Button, Flex, Modal, Paper, Text } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

import Lottie from 'react-lottie';

import checkedJson from 'assets/lotties/checked.json';

interface IProps {
	isConfirm: boolean;
	setIsConfirm: (action: boolean) => void;
	isSuccess: boolean;
	onClose: () => void;
	setIsSuccess: (action: boolean) => void;
}

const AddMissingDayConfirmModal: FC<IProps> = ({ isConfirm, setIsConfirm, isSuccess, onClose, setIsSuccess }) => {
	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: checkedJson
	};
	return (
		<>
			<Modal
				size='sm'
				opened={isConfirm}
				onClose={() => console.log()}
				centered
				padding={35}
				radius='lg'
				withCloseButton={false}
			>
				<Paper radius='lg'>
					<Flex align={'center'} direction={'column'}>
						<Flex justify='center' align='center' direction='column' mb={20}>
							<IconAlertTriangle size='120' color='red' />
						</Flex>
						<Text ta='center' mb={30} weight={600} color='#99A1B7'>
							Please add atleast 1 task
						</Text>
						<Flex>
							<Button
								variant='outline'
								color='red'
								onClick={() => {
									setIsConfirm(false);
								}}
							>
								OK
							</Button>
						</Flex>
					</Flex>
				</Paper>
			</Modal>

			<Modal
				size='sm'
				opened={isSuccess}
				onClose={() => console.log()}
				centered
				padding={35}
				radius='lg'
				withCloseButton={false}
			>
				<Paper radius='lg'>
					<Flex align={'center'} direction={'column'}>
						<Flex justify='center' align='center' direction='column' mb={20}>
							<Lottie options={defaultOptions} height={120} width={120} speed={1.5} />
						</Flex>
						<Text ta='center' mb={10} weight={600} color='#99A1B7'>
							Request has been submitted successfully
						</Text>

						<Button
							variant='outline'
							color='green'
							onClick={() => {
								setIsSuccess(false);
								onClose();
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

export default AddMissingDayConfirmModal;
