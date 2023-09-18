import React, { FC, useState } from 'react';
import Lottie from 'react-lottie';
import moment from 'moment';
import { Box, Button, Divider, Flex, Group, Modal, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { notifications } from '@mantine/notifications';

import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';

import checkedJson from 'assets/lotties/checked.json';

import { IChangeTimeSheet, ITimeSheetData } from '../interface/request';
import ChangeTimeSheetForm from './changeTimesheetForm';

interface IChangeTimeProps {
	isOpen: boolean;
	changeTimeSheet: IChangeTimeSheet;
	isDisableDate: string[];
	onClose: () => void;
}

const ChangeTimeSheet: FC<IChangeTimeProps> = ({ changeTimeSheet, isDisableDate, isOpen, onClose }) => {
	const { changeTimeType, time } = changeTimeSheet;

	const [isLoading, setIsLoading] = useState(false);
	const [ChangeTime, setChangeTime] = useState('In');
	const [timeSheetData, setTimeSheetData] = useState<ITimeSheetData>({
		date: null,
		inTime: '',
		outTime: ''
	});
	const [isSubmit, setIsSubmit] = useState(false);

	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: checkedJson
	};

	const form = useForm({
		initialValues: {
			date: timeSheetData.date,
			changeTimeType: changeTimeType,
			time: time
		},
		validate: {
			date: (value) => value === null && ' ',
			time: (value) => {
				const regex = /^[0-9]{2}:[0-9]{2}$/;
				if (!regex.test(value)) {
					return 'Please enter a valid time format (hh:mm)';
				}
				// Custom validation
				if (value) {
					const [hours, minutes] = value.split(':').map(Number);

					if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
						return 'Invalid time value';
					}
				}

				return null; // Return null if the input is valid
			}
		}
	});

	//Api call for getting timesheet data in date onChange
	const getTimeSheetData = (date) => {
		const payload = {
			date: moment(date).format('YYYY-MM-DD')
		};
		httpService
			.get(API_CONFIG.path.timeSheet, payload)
			.then((res) => {
				setTimeSheetData(res.data);
			})
			.catch((error) => {
				console.error('error', error);
			});
	};

	const handleSubmit = (values) => {
		const payload = {
			date: moment(values.date).format('YYYY-MM-DD'),
			changeTimeType: ChangeTime,
			time: values.time
		};
		setIsLoading(true);

		httpService
			.post(API_CONFIG.path.changeTimeSheet, payload)
			.then(() => {
				setIsLoading(false);
				setIsSubmit(true);
				setTimeout(() => {
					onClose();
				}, 3000);
			})
			.catch((error) => {
				notifications.show({
					message: error.response.data.message,
					color: 'red'
				});
				setIsLoading(false);
				console.error('error', error);
			});
	};

	return (
		<Modal
			shadow='sm'
			size={'600px'}
			pos={'relative'}
			centered
			padding={'20px 0'}
			radius='md'
			withCloseButton={false}
			opened={isOpen}
			onClose={onClose}
		>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Flex direction={'column'} justify={'center'}>
					<Box>
						<Text ta={'center'} fw={700} c={'#252F4A'} fz={22}>
							Change Time Sheet
						</Text>

						<Divider variant='dashed' mt={15} mb={5} />
					</Box>

					{!isSubmit && (
						<Box>
							<ChangeTimeSheetForm
								isDisableDate={isDisableDate}
								form={form}
								getTimeSheetData={getTimeSheetData}
								setChangeTime={setChangeTime}
								ChangeTime={ChangeTime}
								timeSheetData={timeSheetData}
							/>

							<Group position='center' mt='80px' mb={20}>
								<Button
									variant='default'
									sx={{
										background: '#F9F9F9',
										color: '#99A1B7',
										border: 'none'
									}}
									w={100}
									fz={14}
									onClick={onClose}
								>
									Cancel
								</Button>

								<Button
									w={100}
									fz={14}
									loading={isLoading}
									loaderPosition='center'
									loaderProps={{
										size: 'sm',
										color: '#fff',
										variant: 'oval'
									}}
									type='submit'
								>
									{isLoading ? '' : 'Submit'}
								</Button>
							</Group>
						</Box>
					)}
					{isSubmit && (
						<Flex h={'250px'} p={'0 80px'} direction={'column'} justify={'center'} align={'center'}>
							<Lottie options={defaultOptions} height={120} width={120} speed={1.5} />
							<Text fz={16} fw={600} mt={30} ta={'center'} c={'#99A1B7'}>
								Your change timeSheet request submitted successfully.
							</Text>
						</Flex>
					)}
				</Flex>
			</form>
		</Modal>
	);
};

export default ChangeTimeSheet;
