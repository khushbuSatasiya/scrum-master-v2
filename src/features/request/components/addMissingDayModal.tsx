import React, { FC, useState } from 'react';

import { Box, Button, Divider, Flex, Group, Modal, Paper, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconAlertTriangle, IconCalendar } from '@tabler/icons-react';

import moment from 'moment';

import { formatDate } from 'shared/util/utility';

import { useStyles } from '../constants/requestConstants';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	form: any;
	isLoading: boolean;
	handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>, action: string) => void;
	fields: any;
	time: string;
	dailyWorkingMinute: number;
	formatTime: string;
	isDisableDate: string[];
	handleSubmit: (values) => void;
}

const AddMissingDayModal: FC<IProps> = ({
	isOpen,
	onClose,
	form,
	handleTimeChange,
	fields,
	time,
	dailyWorkingMinute,
	formatTime,
	isDisableDate,
	handleSubmit,
	isLoading
}) => {
	const [date, setDate] = useState('');

	const { classes } = useStyles();

	const excludeCustomDates = (date) => {
		const currentDate = new Date();
		const datesArray = isDisableDate.map((item) => item);

		if (date.getDay() === 0 || date.getDay() === 6) {
			return true;
		}

		const formattedDate = moment(date).format('YYYY-MM-DD');

		if (date > currentDate) {
			return true;
		}

		return datesArray.includes(formattedDate);
	};

	return (
		<Modal
			shadow='sm'
			pos={'relative'}
			size={'1050px'}
			sx={{
				display: 'unset !important'
			}}
			centered
			padding={'20px'}
			radius='md'
			withCloseButton={false}
			opened={isOpen}
			onClose={onClose}
		>
			<form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
				<Text ta={'center'} fw={700} c={'#252F4A'} fz={22}>
					Add missing day
				</Text>

				<Divider my='sm' variant='dashed' />
				<Flex justify={'center'}>
					<Paper
						shadow='sm'
						radius='lg'
						mr={40}
						p='lg'
						h={'400px'}
						sx={{
							width: '68%',
							height: 'auto',
							maxHeight: '500px',
							scrollbarWidth: 'none',
							'::-webkit-scrollbar': {
								width: '0.5em',
								display: 'none'
							},
							'::-webkit-scrollbar-thumb': {
								backgroundColor: '#888'
							}
						}}
					>
						<Flex align={'center'} justify={'space-between'}>
							<Text fz='lg' weight={600} color='#5e6278'>
								Task
							</Text>
							<Text ta='center' fz='lg' weight={500}>
								{date ? date : ''}
							</Text>

							<Text fz='lg' weight={500} sx={{ marginRight: '15px' }} w={50}>
								{time ? (
									!time.includes('NaN:NaN') &&
									formatTime.length === 5 &&
									dailyWorkingMinute > 0 &&
									time.length === 5 ? (
										time
									) : (
										<Flex align={'center'} justify={'center'} w={50}>
											<IconAlertTriangle size={18} strokeWidth={2} color={'red'} />
										</Flex>
									)
								) : (
									<Flex align={'center'} justify={'center'} w={50}>
										<IconAlertTriangle size={18} strokeWidth={2} color={'red'} />
									</Flex>
								)}
							</Text>
						</Flex>
						<Divider my='sm' variant='dashed' />
						{fields.length > 0 ? <Group mb='xs'></Group> : <></>}
						{fields.length > 0 && <Box>{fields.reverse()}</Box>}
					</Paper>

					<Paper
						shadow='sm'
						radius='lg'
						p='10px'
						sx={{
							width: '27%',
							height: '400px'
						}}
					>
						<Flex align={'center'} justify={'center'}>
							<Text fz='lg' weight={600} color='#5e6278' p={5}>
								Time
							</Text>
						</Flex>

						<Divider my='sm' variant='dashed' />
						<Flex direction={'column'} justify={'space-between'} sx={{ height: '180px' }} mt={'10px'}>
							<Flex align={'center'} justify={'center'} direction={'column'}>
								<DatePickerInput
									withAsterisk
									autoFocus
									icon={<IconCalendar size='1.1rem' stroke={1.5} />}
									placeholder='Select a date'
									mt={10}
									popoverProps={{ withinPortal: true }}
									variant='filled'
									label={'Date'}
									classNames={{
										label: classes.label,
										input: classes.input,
										error: classes.error,
										wrapper: classes.wrapper
									}}
									sx={{
										width: '205px !important'
									}}
									excludeDate={excludeCustomDates}
									firstDayOfWeek={0}
									maxLevel={'year'}
									{...form.getInputProps('date')}
									onChange={(date) => {
										setDate(formatDate(date));
										form.setFieldValue('date', date);
									}}
								/>
								<TextInput
									w={205}
									withAsterisk
									placeholder='00:00'
									maxLength={5}
									mt={10}
									label='In(24 hour)'
									value={form.values.inTime}
									classNames={{
										label: classes.label,
										input: classes.input,
										error: classes.error,
										wrapper: classes.wrapper
									}}
									ta={'center'}
									labelProps={{ style: { color: '#5e6278' } }}
									{...form.getInputProps('inTime')}
									onChange={(e) => handleTimeChange(e, 'inTime')}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'start'
									}}
								/>
								<TextInput
									withAsterisk
									placeholder='00:00'
									maxLength={5}
									mt={10}
									w={205}
									label='Out(24 hour)'
									value={form.values.outTime}
									classNames={{
										label: classes.label,
										input: classes.input,
										error: classes.error,
										wrapper: classes.wrapper
									}}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'start'
									}}
									ta={'center'}
									labelProps={{ style: { color: '#5e6278' } }}
									{...form.getInputProps('outTime')}
									onChange={(e) => handleTimeChange(e, 'outTime')}
								/>
							</Flex>

							<Divider my='sm' variant='dashed' sx={{ marginTop: '30px !important' }} />
							<Group position='center'>
								<Button
									type='submit'
									sx={{ width: '140px' }}
									mt={'10px'}
									loaderPosition='left'
									loaderProps={{
										size: 'sm',
										color: '#15aabf',
										variant: 'oval'
									}}
									loading={isLoading}
								>
									Submit
								</Button>
							</Group>
						</Flex>
					</Paper>
				</Flex>
			</form>
		</Modal>
	);
};

export default AddMissingDayModal;
