import React, { FC, useEffect } from 'react';
import { Box, Flex, Select, TextInput } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import moment from 'moment';
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
    form: UseFormReturnType<{
        startDay: null;
        endDay: null;
        duration: string;
        reason: string;
        leaveType: string;
    }>;
}
const LeaveForm: FC<ILeaveFormProps> = ({
    isUpcomingLeave,
    isVacational,
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

    return (
        <Box>
            <Select
                radius='md'
                withAsterisk
                label='Leave Duration'
                placeholder='Select Leave Duration'
                variant='filled'
                data={LEAVE_DURATION}
                withinPortal
                classNames={{ label: classes.label, input: classes.input }}
                {...form.getInputProps('duration')}
            />
            <Flex gap={30} w={'100%'}>
                <DatePickerInput
                    w={'50%'}
                    radius='md'
                    withAsterisk
                    icon={<IconCalendar size='1.1rem' stroke={1.5} />}
                    mt={'10px'}
                    popoverProps={{ withinPortal: true }}
                    placeholder='Select a date'
                    variant='filled'
                    label='Start Date'
                    classNames={{ label: classes.label, input: classes.input }}
                    excludeDate={excludeCustomDates}
                    firstDayOfWeek={0}
                    maxLevel={'year'}
                    {...form.getInputProps('startDay')}
                />

                <DatePickerInput
                    w={'50%'}
                    radius='md'
                    withAsterisk
                    icon={<IconCalendar size='1.1rem' stroke={1.5} />}
                    mt={'10px'}
                    popoverProps={{ withinPortal: true }}
                    placeholder='Select a date'
                    variant='filled'
                    label='End Date'
                    firstDayOfWeek={0}
                    excludeDate={excludeCustomDates}
                    classNames={{ label: classes.label, input: classes.input }}
                    {...form.getInputProps('endDay')}
                />
            </Flex>
            <TextInput
                withAsterisk
                placeholder='For Example, Sick Leave'
                mt={'10px'}
                radius='md'
                label='Reason'
                variant='filled'
                classNames={{ label: classes.label, input: classes.input }}
                {...form.getInputProps('reason')}
            />
            {isVacational && (
                <Select
                    label='Leave Type'
                    mt={'10px'}
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
                        input: classes.input,
                    }}
                    dropdownPosition={'bottom'}
                    {...form.getInputProps('leaveType')}
                />
            )}

            <Select
                label='Leave Type'
                mt={'10px'}
                radius='md'
                value='Paid'
                data={[
                    {
                        label: 'Paid',
                        value: 'Paid',
                    },
                ]}
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
                    input: classes.input,
                }}
                dropdownPosition={'bottom'}
            />
        </Box>
    );
};

export default LeaveForm;
