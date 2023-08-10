import { useState } from 'react';
import { Avatar, Box, Button, Flex, Group, LoadingOverlay, Modal, NumberInput, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { isNull } from 'lodash';
import { IUserList } from '../interface/user';
import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { dateFormat } from 'shared/util/utility';
import { DATE_PICKER_FIELDS, LEAVE_FIELDS } from '../constants/userConstants';

interface IEditUserInfo {
	editInfo: IUserList;
	editPopup: boolean;
	handleEditPopup: (editPopup: boolean) => void;
	getUserList: () => void;
}

interface FormValues {
	userLeaveBalance: number;
	vacationalLeave: number;
	birthDate: Date;
	confirmationDate: Date;
	joiningDate: Date;
	paidLeaveStartDate: Date;
	probationCompletionDate: Date;
}
const EditUser: React.FC<IEditUserInfo> = ({ editInfo, editPopup, handleEditPopup, getUserList }) => {
	const [loading, setLoading] = useState(false);

	const {
		id,
		avatar,
		realName,
		designation,
		confirmationDate,
		birthDate,
		joiningDate,
		paidLeaveStartDate,
		probationCompletionDate,
		userLeaveBalance,
		vacationalLeave,
		isAdmin,
		isActive
	} = editInfo;

	/* API call for Update User List */
	const handleSubmit = (values: FormValues) => {
		const params = {
			birthDay: dateFormat(values.birthDate),
			confirmationDate: dateFormat(values.confirmationDate),
			joiningDate: dateFormat(values.joiningDate),
			paidLeaveStartDate: dateFormat(values.paidLeaveStartDate),
			probationCompletionDate: dateFormat(values.probationCompletionDate),
			grantedLeaves: values.userLeaveBalance,
			vacationalLeaves: values.vacationalLeave,
			isAdmin: isAdmin,
			isActive: isActive
		};

		setLoading(true);
		httpService
			.put(`${API_CONFIG.path.updateUser}/${id}`, params)
			.then((res) => {
				setLoading(false);
				handleEditPopup(false);
				getUserList();
				notifications.show({
					message: res.message,
					color: 'green'
				});
			})
			.catch((err: Error) => {
				console.error('Error', err);
				notifications.show({
					message: err.message,
					color: 'red'
				});
				setLoading(false);
			});
	};

	const createDateOrNull = (date) => (isNull(date) ? null : new Date(date));

	const form = useForm({
		initialValues: {
			userLeaveBalance,
			vacationalLeave,
			birthDate: createDateOrNull(birthDate),
			confirmationDate: createDateOrNull(confirmationDate),
			joiningDate: createDateOrNull(joiningDate),
			paidLeaveStartDate: createDateOrNull(paidLeaveStartDate),
			probationCompletionDate: createDateOrNull(probationCompletionDate)
		}
	});
	return (
		<Modal size={'xl'} opened={editPopup} onClose={() => handleEditPopup(false)} title='Edit User' pos={'relative'}>
			<LoadingOverlay
				loaderProps={{
					size: 'xl'
				}}
				visible={loading}
				overlayBlur={2}
			/>
			<Box sx={{ padding: '10px 20px' }}>
				<Avatar src={avatar} size={120} radius={120} mx='auto' />
				<Text ta='center' fz='lg' weight={500} mt='md'>
					{realName}
				</Text>
				<Text ta='center' c='dimmed' fz='sm'>
					{designation}
				</Text>

				<Box mt='md'>
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<Flex mt='xl' w={'100%'} gap={'sm'}>
							<Box w={'50%'}>
								{DATE_PICKER_FIELDS.map(({ label, placeholder, name }, index) => {
									return (
										<DatePickerInput
											key={index}
											mt='sm'
											popoverProps={{ withinPortal: true }}
											label={label}
											placeholder={placeholder}
											variant='filled'
											{...form.getInputProps(name)}
										/>
									);
								})}
							</Box>
							<Box w={'50%'}>
								{LEAVE_FIELDS.map(({ label, placeholder, name }, index) => {
									return (
										<NumberInput
											key={index}
											mt='sm'
											label={label}
											placeholder={placeholder}
											min={0}
											max={99}
											precision={1}
											variant='filled'
											{...form.getInputProps(name)}
										/>
									);
								})}
							</Box>
						</Flex>
						<Group position='right' mt='xl'>
							<Button type='submit' mt='sm'>
								Submit
							</Button>
						</Group>
					</form>
				</Box>
			</Box>
		</Modal>
	);
};

export default EditUser;
