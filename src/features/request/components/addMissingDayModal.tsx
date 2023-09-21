import React, { FC, useState } from 'react';

import { Box, Button, Divider, Flex, Group, Modal, Paper, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconAlertTriangle, IconCalendar } from '@tabler/icons-react';

import moment from 'moment';

import { formatDate } from 'shared/util/utility';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	form: any;
	classes: any;
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
	classes,
	handleTimeChange,
	fields,
	time,
	dailyWorkingMinute,
	formatTime,
	isDisableDate,
	handleSubmit
}) => {
	const [date, setDate] = useState('');

	const excludeCustomDates = (date) => {
		const datesArray = isDisableDate.map((item) => item);
		if (date.getDay() === 0 || date.getDay() === 6) {
			return true;
		}
		const formattedDate = moment(date).format('YYYY-MM-DD');

		return datesArray.includes(formattedDate);
	};

	return (
		<Modal
			shadow='sm'
			pos={'relative'}
			size={1250}
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
				<Flex justify={'space-between'}>
					<Paper
						shadow='sm'
						radius='lg'
						mr={30}
						p='lg'
						h={'450px'}
						sx={{
							width: '75%',
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
							width: '25%',
							height: '450px'
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
										input: classes.input
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
										input: classes.input
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
										input: classes.input
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
									loaderPosition='left'
									mt={'10px'}
									loaderProps={{
										size: 'sm',
										color: '#15aabf',
										variant: 'oval'
									}}
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
