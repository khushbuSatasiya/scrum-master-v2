import React, { FC } from 'react';
import moment from 'moment';
import { Box, Flex, MantineTransition, Select, TextInput } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';

import { ILeaveRequestProps, IUpComingLeave } from '../interface/request';
import {
    LEAVE_DURATION,
    LEAVE_TYPE,
    useStyles,
} from '../constants/requestConstants';

interface ILeaveFormProps {
    leaveRequest: ILeaveRequestProps;
    isUpcomingLeave: IUpComingLeave[];
    isVacational: boolean;
    validationRules: Record<string, any>;
    leaveDuration: string;
    form: UseFormReturnType<{
        startDay: null;
        endDay: null;
        duration: string;
        reason: string;
        leaveType: string;
    }>;
    setLeaveDuration: (value) => void;
}
const LeaveForm: FC<ILeaveFormProps> = ({
    isUpcomingLeave,
    isVacational,
    leaveDuration,
    setLeaveDuration,
    form,
}) => {
    const { classes } = useStyles();

    const excludeCustomDates = (date) => {
        const datesArray = isUpcomingLeave.map((item) => item.date);
        if (date.getDay() === 0 || date.getDay() === 6) {
            return true;
        }
        const formattedDate = moment(date).format('YYYY-MM-DD');

        return datesArray.includes(formattedDate);
    };
    const commonSelectProps = {
        label: 'Type',
        mt: '30px',
        radius: 'sm',
        placeholder: 'Select Leave Type',
        variant: 'filled',
        transitionProps: {
            transition: 'pop-top-left' as MantineTransition,
            duration: 80,
            timingFunction: 'ease',
        },
        withAsterisk: true,
        withinPortal: true,
        classNames: {
            label: classes.label,
            input: classes.input,
            error: classes.error,
            wrapper: classes.wrapper,
        },
        dropdownPosition: 'bottom' as const,
    };
    return (
        <Box>
            <Select
                radius='sm'
                withAsterisk
                label='Duration'
                placeholder='Select Leave Duration'
                variant='filled'
                data={LEAVE_DURATION}
                withinPortal
                classNames={{
                    label: classes.label,
                    input: classes.input,
                    error: classes.error,
                    wrapper: classes.wrapper,
                }}
                {...form.getInputProps('duration')}
                onChange={(value) => {
                    setLeaveDuration(value);
                    form.setFieldValue('duration', value);
                    form.setFieldValue('endDay', null);
                }}
            />
            <Flex gap={30} w={'100%'}>
                <DatePickerInput
                    w={'50%'}
                    radius='sm'
                    withAsterisk
                    icon={<IconCalendar size='1.1rem' stroke={1.5} />}
                    mt={'30px'}
                    popoverProps={{ withinPortal: true }}
                    placeholder='Select a date'
                    variant='filled'
                    label={leaveDuration === 'Full' ? 'From Date' : ' Date'}
                    classNames={{
                        label: classes.label,
                        input: classes.input,
                        error: classes.error,
                        wrapper: classes.wrapper,
                    }}
                    excludeDate={excludeCustomDates}
                    firstDayOfWeek={0}
                    maxLevel={'year'}
                    {...form.getInputProps('startDay')}
                />

                {leaveDuration === 'Full' && (
                    <DatePickerInput
                        w={'50%'}
                        radius='sm'
                        withAsterisk
                        icon={<IconCalendar size='1.1rem' stroke={1.5} />}
                        mt={'30px'}
                        popoverProps={{ withinPortal: true }}
                        placeholder='Select a date'
                        variant='filled'
                        label='To Date'
                        firstDayOfWeek={0}
                        excludeDate={excludeCustomDates}
                        classNames={{
                            label: classes.label,
                            input: classes.input,
                            error: classes.error,
                            wrapper: classes.wrapper,
                        }}
                        {...form.getInputProps('endDay')}
                    />
                )}
            </Flex>
            <TextInput
                withAsterisk
                placeholder='For Example, Sick Leave'
                mt={'30px'}
                radius='sm'
                label='Reason'
                variant='filled'
                classNames={{
                    label: classes.label,
                    input: classes.input,
                    error: classes.error,
                    wrapper: classes.wrapper,
                }}
                {...form.getInputProps('reason')}
            />
            <Select
                {...commonSelectProps}
                data={
                    isVacational
                        ? LEAVE_TYPE
                        : [{ label: 'Paid', value: 'Paid' }]
                }
                value={
                    isVacational
                        ? form.getInputProps('leaveType').value
                        : 'Paid'
                }
                onChange={
                    isVacational
                        ? form.getInputProps('leaveType').onChange
                        : undefined
                }
                {...form.getInputProps('leaveType')}
            />
        </Box>
    );
};

export default LeaveForm;
