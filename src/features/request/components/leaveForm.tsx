import { Box, Flex, Select, TextInput } from '@mantine/core';
import React, { FC } from 'react';
import {
    LEAVE_DURATION,
    LEAVE_TYPE,
    useStyles,
} from '../constants/requestConstants';
import { IconCalendar } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { ILeaveRequestProps } from '../interface/request';
import moment from 'moment';
interface ILeaveFormProps {
    isReview: boolean;
    leaveRequest: ILeaveRequestProps;
    isUpcomingLeave: any;
    isVacational: boolean;
}
const LeaveForm: FC<ILeaveFormProps> = ({
    isReview,
    leaveRequest,
    isUpcomingLeave,
    isVacational,
}) => {
    const { startDay, endDay, reason, duration, leaveType } = leaveRequest;
    const { classes } = useStyles();

    const validationRules: Record<string, any> = {
        startDay: (value) => value === null && ' Start Day is Required',
        endDay: (value) => value === null && ' End Day is Required',
        duration: (value) =>
            value === '' ? 'Leave Duration is required' : null,
        reason: (value) => (value === '' ? 'Reason is required' : null),
    };

    const form = useForm({
        initialValues: {
            startDay: startDay,
            endDay: endDay,
            duration: duration,
            reason: reason,
            leaveType: leaveType,
        },
        validate: validationRules,
    });

    const excludeCustomDates = (date) => {
        const datesArray = isUpcomingLeave.map((item) => item.date);
        if (date.getDay() === 0 || date.getDay() === 6) {
            return true;
        }
        const formattedDate = moment(date).format('YYYY-MM-DD');

        return datesArray.includes(formattedDate);
    };
    return (
        <Box className={isReview ? 'slide-left' : 'slide-right'}>
            <Select
                withAsterisk
                label='Leave Duration'
                placeholder='Select Leave Duration'
                variant='filled'
                data={LEAVE_DURATION}
                withinPortal
                classNames={{ label: classes.label }}
                {...form.getInputProps('duration')}
            />

            <Flex gap={30} w={'100%'}>
                <DatePickerInput
                    w={'50%'}
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
                    w={'50%'}
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
            </Flex>

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
                    classNames={{
                        label: classes.label,
                    }}
                    dropdownPosition={'bottom'}
                    {...form.getInputProps('leaveType')}
                />
            )}
        </Box>
    );
};

export default LeaveForm;
