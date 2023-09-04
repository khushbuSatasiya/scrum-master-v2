import React, { FC } from 'react';
import {
    Box,
    Button,
    Divider,
    Flex,
    Modal,
    Select,
    Text,
    TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar } from '@tabler/icons-react';
import {
    LEAVE_DURATION,
    LEAVE_TYPE,
    useStyles,
} from '../constants/requestConstants';
import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { notifications } from '@mantine/notifications';
import moment from 'moment';
import { ILeaveRequestProps } from '../interface/request';

interface ILeaveProps {
    leaveRequest: ILeaveRequestProps;
    isOpen: boolean;
    isUpcomingLeave: any;
    isVacational: boolean;
    onClose: () => void;
}
const LeaveRequest: FC<ILeaveProps> = ({
    leaveRequest,
    isOpen,
    isVacational,
    isUpcomingLeave,
    onClose,
}) => {
    const { classes } = useStyles();

    const { startDay, endDay, reason, duration } = leaveRequest;
    const form = useForm({
        initialValues: {
            startDay: startDay,
            endDay: endDay,
            duration: duration,
            reason: reason,
            leaveType: '',
        },
        validate: {
            startDay: (value) => value === null && ' Start Day is Required',
            endDay: (value) => value === null && ' End Day is Required',
            duration: (value) =>
                value === '' ? 'Leave Duration is required' : null,
            reason: (value) => (value === '' ? 'Reason is required' : null),
            leaveType: (value) =>
                value === '' ? 'Leave Type is required' : null,
        },
    });

    const excludeCustomDates = (date) => {
        const datesArray = isUpcomingLeave.map((item) => item.date);
        if (date.getDay() === 0 || date.getDay() === 6) {
            return true;
        }
        // Format the current date and the next day
        const formattedDate = date.toISOString().split('T')[0];
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        const formattedNextDay = nextDay.toISOString().split('T')[0];

        // Check if either the current date or the next day is in the disabledDates array
        return (
            datesArray.includes(formattedDate) ||
            datesArray.includes(formattedNextDay)
        );
    };

    const handleSubmit = (values) => {
        const { startDay, endDay, duration, reason, leaveType } = values;
        const startDate = moment(startDay).format('YYYY-MM-DD');
        const endDate = moment(endDay).format('YYYY-MM-DD');

        const payload = {
            startDate: startDate,
            endDate: endDate,
            duration: duration,
            reason: reason,
            leaveType: leaveType,
        };

        httpService
            .post(`${API_CONFIG.path.leaveRequest}`, payload)
            .then((res) => {
                onClose();
                notifications.show({
                    message: res.message,
                    color: 'green',
                });
            })
            .catch((error) => {
                console.error('error', error);
                notifications.show({
                    message: error.response.data.message,
                    color: 'red',
                });
                onClose();
            });
    };

    return (
        <Modal
            shadow='sm'
            size={'500px'}
            pos={'relative'}
            centered
            padding={20}
            radius='lg'
            withCloseButton={true}
            opened={isOpen}
            onClose={onClose}
            classNames={{
                header: classes.header,
                close: classes.close,
            }}>
            <Box>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Text ta={'center'} fw={600} c={'#071437'} fz={22}>
                        Request For A Leave
                    </Text>
                    <Divider variant='dashed' mt={10} mb={10} />

                    <Select
                        withAsterisk
                        mt='sm'
                        label='Leave Duration'
                        placeholder='Select Leave Duration'
                        variant='filled'
                        data={LEAVE_DURATION}
                        withinPortal
                        classNames={{ label: classes.label }}
                        {...form.getInputProps('duration')}
                    />

                    <DatePickerInput
                        withAsterisk
                        icon={<IconCalendar size='1.1rem' stroke={1.5} />}
                        mt='sm'
                        popoverProps={{ withinPortal: true }}
                        placeholder='Select a date'
                        variant='filled'
                        label='Start Day'
                        classNames={{ label: classes.label }}
                        excludeDate={excludeCustomDates}
                        firstDayOfWeek={0}
                        maxLevel={'year'}
                        {...form.getInputProps('startDay')}
                    />

                    <DatePickerInput
                        withAsterisk
                        icon={<IconCalendar size='1.1rem' stroke={1.5} />}
                        mt='sm'
                        popoverProps={{ withinPortal: true }}
                        placeholder='Select a date'
                        variant='filled'
                        label='End Day'
                        firstDayOfWeek={0}
                        excludeDate={excludeCustomDates}
                        classNames={{ label: classes.label }}
                        {...form.getInputProps('endDay')}
                    />

                    <TextInput
                        withAsterisk
                        placeholder='For Example, Sick Leave'
                        mt={'sm'}
                        label='Reason'
                        variant='filled'
                        classNames={{ label: classes.label }}
                        {...form.getInputProps('reason')}
                    />

                    {isVacational && (
                        <Select
                            label='Leave Type'
                            mt='sm'
                            radius='md'
                            data={LEAVE_TYPE}
                            placeholder='Select Leave Type'
                            variant='filled'
                            transitionProps={{
                                transition: 'pop-top-left',
                                duration: 80,
                                timingFunction: 'ease',
                            }}
                            withAsterisk
                            withinPortal
                            classNames={{ label: classes.label }}
                            dropdownPosition={'bottom'}
                            {...form.getInputProps('leaveType')}
                        />
                    )}

                    <Flex justify={'center'} mt={30} mb={10}>
                        <Button type='submit'>Review</Button>
                    </Flex>
                </form>
            </Box>
        </Modal>
    );
};

export default LeaveRequest;
