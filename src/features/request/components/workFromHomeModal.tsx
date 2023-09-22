import React, { FC } from 'react';

import { Anchor, Box, Button, Checkbox, Divider, Flex, Group, Modal, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';

import Lottie from 'react-lottie';

import checkedJson from 'assets/lotties/checked.json';

import { useStyles } from '../constants/requestConstants';

interface IProps {
	onClose: () => void;
	form: any;
	isOpen: boolean;
	handleSubmit: (values) => void;
	isLoading: boolean;
	isSuccess: boolean;
}

const WorkFromHomeModal: FC<IProps> = ({ isOpen, onClose, form, handleSubmit, isLoading, isSuccess }) => {
	const { classes } = useStyles();

	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: checkedJson
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
			<form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
				<Flex direction={'column'} justify={'center'}>
					<Box>
						<Text ta={'center'} fw={700} c={'#252F4A'} fz={22}>
							Request Work From Home
						</Text>

						<Text ta={'center'} c={'#99A1B7'} fz={14} fw={500} mb={10}>
							If you need more info, please check{' '}
							<Anchor
								href='https://docs.google.com/document/d/1NwUvp0YJ-DwcuWFp-NMxa4bTHSMbrozAkzb-cXYdjfE/edit'
								target='_blank'
								sx={{
									color: '#228be6',
									'&:hover': {
										textDecoration: 'none'
									}
								}}
							>
								WFH Policy
							</Anchor>
							.
						</Text>

						<Divider variant='dashed' mt={15} mb={5} />
						{!isSuccess && (
							<>
								<Box p={'0 80px'} h={'250px'}>
									<DatePickerInput
										withAsterisk
										autoFocus
										icon={<IconCalendar size='1.1rem' stroke={1.5} />}
										placeholder='Select a date'
										mt={24}
										w={'100%'}
										popoverProps={{ withinPortal: true }}
										variant='filled'
										label={'Start day'}
										classNames={{
											label: classes.label,
											input: classes.input,
											error: classes.error,
											wrapper: classes.wrapper
										}}
										firstDayOfWeek={0}
										maxLevel={'year'}
										excludeDate={(date) => {
											const dayOfWeek = date.getDay();
											return dayOfWeek === 0 || dayOfWeek === 6;
										}}
										{...form.getInputProps('startDate')}
									/>

									<DatePickerInput
										withAsterisk
										autoFocus
										icon={<IconCalendar size='1.1rem' stroke={1.5} />}
										placeholder='Select a date'
										mt={24}
										w={'100%'}
										popoverProps={{ withinPortal: true }}
										variant='filled'
										label={'End day'}
										classNames={{
											label: classes.label,
											input: classes.input,
											error: classes.error,
											wrapper: classes.wrapper
										}}
										firstDayOfWeek={0}
										excludeDate={(date) => {
											const dayOfWeek = date.getDay();
											return dayOfWeek === 0 || dayOfWeek === 6;
										}}
										maxLevel={'year'}
										{...form.getInputProps('endDate')}
									/>

									<TextInput
										placeholder={'Write a proper reason'}
										label='Reason'
										w={'100%'}
										mt={24}
										// onChange={handleChange('isConfirm')}
										// onBlur={handleBlur('isConfirm')}
										{...form.getInputProps('reason')}
										classNames={{
											label: classes.label,
											input: classes.input,
											error: classes.error,
											wrapper: classes.wrapper
										}}
										onKeyDown={(event) => {
											if (event.key === ' ' && event.currentTarget.selectionStart === 0) {
												event.preventDefault();
											}
										}}
									/>

									<Checkbox
										label='I agree to term and condition of work from home'
										mt={24}
										checked={form.values.isConfirm}
										{...form.getInputProps('isConfirm')}
									/>
								</Box>

								<Group position='center' mt='100px' mb={20}>
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
							</>
						)}
					</Box>
				</Flex>
			</form>

			{isSuccess && (
				<Flex h={'250px'} p={'0 80px'} direction={'column'} justify={'center'} align={'center'}>
					<Lottie options={defaultOptions} height={120} width={120} speed={1.5} />
					<Text fz={16} fw={600} mt={30} ta={'center'} c={'#99A1B7'}>
						Request has been submitted successfully
					</Text>
				</Flex>
			)}
		</Modal>
	);
};

export default WorkFromHomeModal;
