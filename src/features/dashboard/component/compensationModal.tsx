import React, { FC } from 'react';

import { Divider, Modal, Text } from '@mantine/core';

interface IProps {
	isShowCompModal: boolean;
	setIsShowCompModal: (action: boolean) => void;
}
const CompensationModal: FC<IProps> = ({ isShowCompModal, setIsShowCompModal }) => {
	return (
		<Modal
			opened={isShowCompModal}
			onClose={() => setIsShowCompModal(false)}
			centered
			radius='lg'
			withCloseButton={false}
		>
			<Text ta={'center'} fw={600}>
				How to calculate?
			</Text>

			<Divider variant='dashed' mt={15} mb={5} />
			<Text fz={14} mt={8}>
				To calculate compensation days based on hours worked instead of actual days, we have followed below
				step:
			</Text>
			<Text fz={14} mt={8}>
				suppose you work 24:10 hours as a componsation in 3 days
			</Text>
			<Text mt={8} fz={14}>
				Full compensation: 08 hours 30 minutes
			</Text>
			<Text mb={8} fz={14}>
				{' '}
				Half compensation: 04 hours 30 minutes
			</Text>
			<Text fz={14}>
				Step 1: Divide the total hours worked (24 hours and 10 minutes) by the full compensation hours (8 hours
				and 30 minutes):
			</Text>

			<Text fz={14}>24:10 / 8:30 = 2 full days and 07:10 hours remaining</Text>

			<Text fz={14} mt={8}>
				Step 2: Divide the remaining hours (07:10) by the half compensation hours (4 hours and 30 minutes):
			</Text>

			<Text fz={14}>07:10 / 4:30 = 1 half day and 2:40 hours remaining</Text>

			<Text fz={14} mt={8}>
				So, your total compensation is 2.5 days and 2 hours and 40 minutes (02:40)
			</Text>
		</Modal>
	);
};

export default CompensationModal;
