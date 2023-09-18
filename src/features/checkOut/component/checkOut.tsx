import React, { FC, useCallback, useEffect, useState } from 'react';

import { useForm, yupResolver } from '@mantine/form';

import { useMantineTheme } from '@mantine/core';

import {
	checkOutValidationSchema,
	checkOutValidationWithOptSchema,
	checkOutwithNoTaskValidationSchema
} from 'shared/constants/validation-schema';
import { showNotification } from 'shared/components/notification/notification';
import httpService from 'shared/services/http.service';
import { getProjectList, minuteToHour } from 'shared/util/utility';
import { API_CONFIG } from 'shared/constants/api';

import { IActionTime, IEnteredTask } from 'features/dashboard/interface/dashboard';

import CheckOutForm from './checkOutForm';
import CheckoutModals from './checkoutModals';

interface IProps {
	enteredTask: IEnteredTask[];
	checkOutDate: string;
	checkStatus: () => void;
	projectArray: any;
	currentTime: string;
	actionTime: IActionTime;
}

const CheckOut: FC<IProps> = ({ enteredTask, checkOutDate, checkStatus, projectArray, currentTime, actionTime }) => {
	const theme = useMantineTheme();

	const [projects, setProjects] = useState([]);
	const [isShowForm, setIsShowForm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isAlreadyCheckOut, setIsAlreadyCheckOut] = useState(false);
	const [isConfirm, setIsConfirm] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);
	const [onChangeTIme, setOnChangeTime] = useState('');
	const [diffTime, setDiffTime] = useState('');
	const [dailyWorkingMinute, setDailyWorkingMinute] = useState(0);

	const formatValues = (userTask: any) => {
		const tasksArray = userTask.map((task: any) => {
			return {
				taskId: task.projectId,
				taskName: task.taskCreate,
				projectHours: '',
				projectName: task.projectDetails.projectName,
				id: task.id
			};
		});

		return {
			time: currentTime,
			employees: [
				[
					{
						task: '',
						project: '',
						projectHours: ''
					}
				]
			],
			tasks: userTask.length > 0 ? tasksArray : []
		};
	};

	const selectedValidationSchema = () => {
		if (isShowForm || enteredTask.length === 0) {
			if (enteredTask.length > 0) {
				return checkOutValidationWithOptSchema;
			} else {
				return checkOutwithNoTaskValidationSchema;
			}
		} else {
			if (enteredTask.length > 0) {
				return checkOutValidationSchema;
			}
		}
	};

	const validationSchema = selectedValidationSchema();

	const form = useForm({
		initialValues: formatValues(enteredTask),
		validate: yupResolver(validationSchema)
	});

	const getProject = useCallback(() => {
		setProjects(getProjectList(projectArray));
	}, [projectArray]);

	useEffect(() => {
		getProject();
	}, [getProject]);

	const handleAddTaskBtn = () => {
		setIsShowForm(!isShowForm);
	};

	useEffect(() => {
		setOnChangeTime(currentTime);
	}, []);

	const handleTimeChange = (e) => {
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
		setOnChangeTime(formattedTime);
		form.setFieldValue('time', formattedTime);
	};

	/* API call for check out */
	const handleCheckOut = useCallback(
		async (values: any) => {
			const project = values.employees.filter((value) => value.project && value.task && value.projectHours);

			if (!project.length && !values.tasks.length) {
				setIsConfirm(true);
			} else {
				const updatedTasks = values.tasks.map((item) => {
					return {
						taskId: item.id,
						projectId: item.taskId,
						taskName: item.taskName,
						projectHours: item.projectHours
					};
				});

				const updatedEmployees = values.employees.map((item) => {
					return {
						taskId: '',
						projectId: item.project,
						taskName: item.task,
						projectHours: item.projectHours
					};
				});

				let tasks;

				if (enteredTask.length > 0) {
					tasks = [...updatedTasks, ...updatedEmployees];
				} else {
					tasks = [...updatedEmployees];
				}

				const payload = {
					outTime: values.time,
					date: checkOutDate,
					tasks: tasks.filter((value) => value.projectHours && value.projectId && value.taskName)
				};
				setIsLoading(true);
				try {
					await httpService.post(API_CONFIG.path.checkOut, payload).then((res: any) => {
						setIsSubmit(true);
						setIsLoading(false);
						// showNotification(res, theme.colors.blue[6], theme.colors.blue[6]);
					});
				} catch (error) {
					setIsLoading(false);
					showNotification(error, theme.colors.red[6], theme.colors.red[6]);
					if (error?.response?.status === 409) {
						setIsAlreadyCheckOut(true);
					}
					console.error(error);
				}
			}
		},
		[checkOutDate, enteredTask.length, theme.colors.red]
	);

	const timeSubtraction = useCallback(() => {
		const inTimeArr = actionTime.inTime.split(':');
		let outTimeArr;

		if (onChangeTIme || onChangeTIme.includes(':') || onChangeTIme.length === 5) {
			outTimeArr = onChangeTIme.split(':');
		} else if (!onChangeTIme) {
			outTimeArr = currentTime.split(':');
		}
		const inSec = new Date().setHours(Number(inTimeArr[0]), Number(inTimeArr[1]));

		const outSec = new Date().setHours(Number(outTimeArr[0]), Number(outTimeArr[1]));

		const workTime = (outSec - inSec) / (1000 * 60 * 60);
		const dailyWorkingMinutes = Math.round(Number(workTime) * 60);
		setDailyWorkingMinute(dailyWorkingMinutes);
		setDiffTime(minuteToHour(dailyWorkingMinutes));
	}, [actionTime.inTime, currentTime, onChangeTIme]);

	useEffect(() => {
		timeSubtraction();
	}, [timeSubtraction]);

	return (
		<>
			<CheckOutForm
				handleCheckOut={handleCheckOut}
				form={form}
				userTasks={enteredTask}
				projects={projects}
				isShowForm={isShowForm}
				setIsShowForm={setIsShowForm}
				handleAddTaskBtn={handleAddTaskBtn}
				checkOutDate={checkOutDate}
				isLoading={isLoading}
				actionTime={actionTime}
				handleTimeChange={handleTimeChange}
				timeSubtraction={timeSubtraction}
				diffTime={diffTime}
				onChangeTIme={onChangeTIme}
				dailyWorkingMinute={dailyWorkingMinute}
			/>

			<CheckoutModals
				isConfirm={isConfirm}
				setIsConfirm={setIsConfirm}
				checkStatus={checkStatus}
				isAlreadyCheckOut={isAlreadyCheckOut}
				setIsAlreadyCheckOut={setIsAlreadyCheckOut}
				setIsSubmit={setIsSubmit}
				isSubmit={isSubmit}
			/>
		</>
	);
};

export default CheckOut;
