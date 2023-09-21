import React, { FC, useCallback, useEffect, useState } from 'react';

import { Divider, Flex, Group, Paper, Select, TextInput, Textarea, createStyles } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import { minuteToHour } from 'shared/util/utility';
import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';

import { IProject } from 'features/checkIn/interface/checkIn';

import AddMissingDayModal from './addMissingDayModal';
import AddMissingDayConfirmModal from './addMissingDayConfirmModal';
import { addMissingDayValidationSchema } from 'shared/constants/validation-schema';

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

	const useStyles = createStyles(() => ({
		input: {
			backgroundColor: '#f5f8fa',
			color: '5e6278',
			fontWight: '500',
			border: 'transparent'
		},
		label: {
			color: '#99A1B7 !important'
		}
	}));

	const { classes } = useStyles();

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
							width: '40%',
							border: 'none',
							color: 'black'
						}}
						classNames={{
							input: classes.input
						}}
					/>
					<TextInput
						withAsterisk
						placeholder='00:00'
						maxLength={5}
						maw={270}
						classNames={{
							input: classes.input
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
						sx={{ width: '730px', color: 'black' }}
						{...form.getInputProps(`employees.${index}.task`)}
						onKeyDown={(event) => {
							if (event.key === ' ' && event.currentTarget.selectionStart === 0) {
								event.preventDefault();
							}
						}}
						classNames={{
							input: classes.input
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
				const proList = res.data.map((item) => {
					return {
						label: item.projectName,
						value: item.id
					};
				});
				setProjectList(proList);
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
			const project = values.employees.filter((item) => item.project && item.task && item.projectHour);
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

			await httpService
				.post(API_CONFIG.path.missingDay, payload)
				.then(() => {
					setIsSuccess(true);
				})
				.catch((error) => {
					console.error('error', error);
					setIsSuccess(false);
				});
		},
		[setIsSuccess]
	);

	return (
		<>
			<AddMissingDayModal
				form={form}
				classes={classes}
				isOpen={isOpen}
				onClose={onClose}
				handleTimeChange={handleTimeChange}
				fields={fields}
				time={time}
				dailyWorkingMinute={dailyWorkingMinute}
				formatTime={formatTime}
				isDisableDate={isDisableDate}
				handleSubmit={handleSubmit}
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
