import React, { FC, useCallback, useEffect, useState } from 'react';

import { Divider, Flex, Group, Paper, Select, TextInput, Textarea, useMantineTheme } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import { getProjectList, minuteToHour } from 'shared/util/utility';
import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { IProject } from 'features/checkIn/interface/checkIn';
import { addMissingDayValidationSchema } from 'shared/constants/validation-schema';
import { showNotification } from 'shared/components/notification/notification';

import { useStyles } from '../constants/requestConstants';

import AddMissingDayModal from './addMissingDayModal';
import AddMissingDayConfirmModal from './addMissingDayConfirmModal';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	isSuccess: boolean;
	setIsSuccess: (action: boolean) => void;
}

const AddMissingDay: FC<IProps> = ({ isOpen, onClose, isSuccess, setIsSuccess }) => {
	const [time, setTime] = useState('');
	const [inTime, setInTime] = useState(0);
	const [outTime, setOutTime] = useState(0);
	const [dailyWorkingMinute, setDailyWorkingMinute] = useState(0);
	const [formatTime, setFormatTime] = useState('');
	const [isDisableDate, setIsDisableDate] = useState([]);
	const [projectList, setProjectList] = useState<IProject[]>([]);
	const [isConfirm, setIsConfirm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { classes } = useStyles();
	const theme = useMantineTheme();

	const form = useForm({
		initialValues: {
			date: null,
			inTime: '',
			outTime: '',
			employees: [
				{
					task: '',
					project: '',
					projectHour: ''
				},
				{
					task: '',
					project: '',
					projectHour: ''
				}
			]
		},
		validate: yupResolver(addMissingDayValidationSchema)
	});

	const diffTime = (formattedTime, action) => {
		let inTimeArr;
		let outTimeArr;

		let tmpInTime = inTime;
		let tmpOutTime = outTime;

		if (action === 'inTime' && formattedTime.includes(':') && formattedTime.length === 5) {
			inTimeArr = formattedTime.split(':');
			tmpInTime = new Date().setHours(Number(inTimeArr[0]), Number(inTimeArr[1]));
			inTimeArr.length === 2 && setInTime(tmpInTime);
		} else if (action === 'outTime' && formattedTime.includes(':') && formattedTime.length === 5) {
			outTimeArr = formattedTime.split(':');
			tmpOutTime = new Date().setHours(Number(outTimeArr[0]), Number(outTimeArr[1]));
			outTimeArr.length === 2 && setOutTime(tmpOutTime);
		}

		const workTime = (tmpOutTime - tmpInTime) / (1000 * 60 * 60);
		const dailyWorkingMinutes = Math.round(Number(workTime) * 60);
		setDailyWorkingMinute(dailyWorkingMinutes);
		setTime(minuteToHour(dailyWorkingMinutes));
	};

	const handleTimeChange = (e, action) => {
		const input = e.target.value;
		let formattedTime = input
			.replace(/\D/g, '')
			.slice(0, 4)
			.replace(/(\d{2})(\d{0,2})/, '$1:$2');

		if (e.nativeEvent.inputType === 'deleteContentBackward') {
			const lastChar = formattedTime.charAt(formattedTime.length - 1);
			if (lastChar === ':') {
				formattedTime = formattedTime.slice(0, -1);
			}
		}

		form.setFieldValue(action, formattedTime);
		setFormatTime(formattedTime);
		diffTime(formattedTime, action);
	};

	const handleProjectHours = (e, index) => {
		const input = e.target.value;
		let formattedTime = input
			.replace(/\D/g, '')
			.slice(0, 4)
			.replace(/(\d{2})(\d{0,2})/, '$1:$2');

		if (e.nativeEvent.inputType === 'deleteContentBackward') {
			const lastChar = formattedTime.charAt(formattedTime.length - 1);
			if (lastChar === ':') {
				formattedTime = formattedTime.slice(0, -1);
			}
		}
		form.setFieldValue(`employees.${index}.projectHour`, formattedTime);
	};

	const fields = form.values.employees.map((item, index) => (
		<Paper key={index}>
			<Group mt='xs' sx={{ alignItems: 'end' }}>
				<Flex>
					<Select
						// searchable
						clearable
						placeholder='Project names'
						nothingFound='No options'
						dropdownPosition='bottom'
						data={projectList}
						{...form.getInputProps(`employees.${index}.project`)}
						sx={{
							width: '40%'
						}}
						classNames={{
							label: classes.label,
							input: classes.input,
							wrapper: classes.wrapper
						}}
					/>
					<TextInput
						withAsterisk
						placeholder='00:00'
						maxLength={5}
						maw={270}
						classNames={{
							label: classes.label,
							input: classes.input,
							wrapper: classes.wrapper
						}}
						sx={{ marginLeft: '20px' }}
						{...form.getInputProps(`employees.${index}.projectHour`)}
						onChange={(e) => {
							handleProjectHours(e, index);
						}}
					/>
				</Flex>
				<Flex align={'end'}>
					<Textarea
						autosize
						placeholder={`- task 1\n- task 2`}
						minRows={2}
						sx={{ width: '640px', color: 'black' }}
						{...form.getInputProps(`employees.${index}.task`)}
						onKeyDown={(event) => {
							if (event.key === ' ' && event.currentTarget.selectionStart === 0) {
								event.preventDefault();
							}
						}}
						classNames={{
							label: classes.label,
							input: classes.input,
							wrapper: classes.wrapper
						}}
					/>
				</Flex>
			</Group>

			<Divider my='lg' variant='dashed' />
		</Paper>
	));

	const getDisableDate = () => {
		httpService
			.get(`${API_CONFIG.path.disableNonMissingDay}`)
			.then((res) => {
				setIsDisableDate(res.data.date);
			})
			.catch((error) => {
				console.error('error', error);
			});
	};

	useEffect(() => {
		getDisableDate();
	}, []);

	const getProjects = useCallback(() => {
		httpService
			.get(`${API_CONFIG.path.projects}`)
			.then((res) => {
				setProjectList(getProjectList(res.data));
			})
			.catch((error) => {
				console.error('Error', error);
			});
	}, []);

	useEffect(() => {
		getProjects();
	}, [getProjects]);

	const handleSubmit = useCallback(
		async (values) => {
			const project = values.employees.filter((item) => item.project !== null && item.task && item.projectHour);
			!project.length && setIsConfirm(true);

			const tasks = values.employees.map((item) => {
				return {
					projectId: item.project,
					taskName: item.task,
					projectHours: item.projectHour
				};
			});

			const payload = {
				date: values.date,
				inTime: values.inTime,
				outTime: values.outTime,
				tasks
			};

			const filteredTasks = payload.tasks.filter((task) => {
				return task.projectId !== '' && task.projectHours !== '' && task.taskName !== '';
			});

			payload.tasks = filteredTasks;
			setIsLoading(true);
			await httpService
				.post(API_CONFIG.path.missingDay, payload)
				.then((res) => {
					setIsLoading(false);
					setIsSuccess(true);
					// showNotification(res, theme.colors.blue[6], theme.colors.blue[6]);
				})
				.catch((error) => {
					console.error('error', error);
					showNotification(error, theme.colors.red[6], theme.colors.red[6]);
					setIsLoading(false);
					setIsSuccess(false);
				});
		},
		[setIsSuccess, theme.colors.red]
	);

	return (
		<>
			<AddMissingDayModal
				form={form}
				isOpen={isOpen}
				onClose={onClose}
				handleTimeChange={handleTimeChange}
				fields={fields}
				time={time}
				dailyWorkingMinute={dailyWorkingMinute}
				formatTime={formatTime}
				isDisableDate={isDisableDate}
				handleSubmit={handleSubmit}
				isLoading={isLoading}
			/>
			<AddMissingDayConfirmModal
				isConfirm={isConfirm}
				setIsConfirm={setIsConfirm}
				isSuccess={isSuccess}
				onClose={onClose}
				setIsSuccess={setIsSuccess}
			/>
		</>
	);
};

export default AddMissingDay;
