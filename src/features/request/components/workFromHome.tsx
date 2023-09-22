import React, { FC, useState } from 'react';

import { useForm, yupResolver } from '@mantine/form';
import { useMantineTheme } from '@mantine/core';

import { wfhValidationSchema } from 'shared/constants/validation-schema';
import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { showNotification } from 'shared/components/notification/notification';

import WorkFromHomeModal from './workFromHomeModal';

interface IProps {
	onClose: () => void;
	isOpen: boolean;
}

const WorkFromHome: FC<IProps> = ({ onClose, isOpen }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm({
		initialValues: {
			startDate: null,
			endDate: null,
			reason: '',
			isConfirm: false
		},
		validate: yupResolver(wfhValidationSchema)
	});

	const theme = useMantineTheme();

	const handleSubmit = async (values) => {
		const { startDate, endDate, reason } = values;

		const payload = {
			startDate,
			endDate,
			reason
		};
		setIsLoading(true);
		await httpService
			.post(API_CONFIG.path.wfh, payload)
			.then((res) => {
				setIsLoading(false);
				setIsSuccess(true);

				setTimeout(() => {
					onClose();
				}, 3000);
				// showNotification(res, theme.colors.blue[6], theme.colors.blue[6]);
			})
			.catch((error) => {
				console.error('error', error);
				showNotification(error, theme.colors.red[6], theme.colors.red[6]);
				setIsLoading(false);
				setIsSuccess(false);
			});
	};

	return (
		<WorkFromHomeModal
			isOpen={isOpen}
			onClose={onClose}
			form={form}
			handleSubmit={handleSubmit}
			isLoading={isLoading}
			isSuccess={isSuccess}
		/>
	);
};

export default WorkFromHome;
