import React, { FC } from 'react';

import { Box, Button, Flex, Group, Paper, Space, Text, Divider, TextInput } from '@mantine/core';

import { getTodayDate } from 'shared/util/utility';

import { ICheckInValues } from '../interface/checkIn';

interface IProps {
	form: any;
	handleCheckIn: (values: ICheckInValues) => void;
	fields: any;
	isLoading: boolean;
	classes: {
		input: string;
	};
	isConfirm: boolean;
	handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckInForm: FC<IProps> = ({ form, handleCheckIn, fields, isLoading, classes, isConfirm, handleTimeChange }) => {
	return (
		<form onSubmit={form.onSubmit((values) => handleCheckIn(values))}>
			<Flex justify={'space-between'}>
				<Paper
					shadow='sm'
					radius='lg'
					mr={30}
					p='lg'
					sx={{
						width: '75%',
						overflowY: 'scroll',
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
							{getTodayDate()}
						</Text>

						<Text fz='lg' weight={500} sx={{ marginRight: '15px', visibility: 'hidden' }}>
							Check In
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
						height: '300px'
					}}
				>
					<Flex align={'center'} justify={'center'}>
						<Text fz='lg' weight={600} color='#5e6278' p={5}>
							Time
						</Text>
					</Flex>

					<Divider my='sm' variant='dashed' />
					<Flex direction={'column'} justify={'space-between'} sx={{ height: '180px' }} mt={'10px'}>
						<Flex align={'center'} justify={'center'}>
							<TextInput
								withAsterisk
								placeholder='00:00'
								maxLength={5}
								mt={24}
								w={205}
								label='(24 hour)'
								value={form.values.time}
								classNames={{
									input: classes.input
								}}
								ta={'center'}
								labelProps={{ style: { color: '#5e6278' } }}
								{...form.getInputProps('time')}
								onChange={(e) => handleTimeChange(e)}
							/>
						</Flex>

						<Divider my='sm' variant='dashed' sx={{ marginTop: '60px !important' }} />
						<Group position='center'>
							<Button
								type='submit'
								sx={{ width: '140px' }}
								loading={!isConfirm && isLoading}
								disabled={isLoading}
								loaderPosition='left'
								mt={'10px'}
								loaderProps={{
									size: 'sm',
									color: '#15aabf',
									variant: 'oval'
								}}
							>
								Check In
							</Button>
						</Group>
					</Flex>
				</Paper>
			</Flex>
		</form>
	);
};

export default CheckInForm;
