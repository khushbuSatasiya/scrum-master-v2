import React, { FC } from 'react';
import moment from 'moment';
import { Box, Flex, SegmentedControl, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { UseFormReturnType } from '@mantine/form';

import {
    CHANGE_TIMESHEET_TYPE,
    changeTimeStyles,
} from '../constants/requestConstants';
import { ITimeSheetData } from '../interface/request';

import '../style/request.scss';

interface IChangeTimeSheetProps {
    ChangeTime: string;
    isDisableDate: string[];
    timeSheetData: ITimeSheetData;
    form: UseFormReturnType<{
        date: Date;
        changeTimeType: string;
        time: string;
    }>;
    getTimeSheetData: (val) => void;
    setChangeTime: (val) => void;
}
const ChangeTimeSheetForm: FC<IChangeTimeSheetProps> = ({
    isDisableDate,
    form,
    ChangeTime,
    timeSheetData,
    getTimeSheetData,
    setChangeTime,
}) => {
    const { classes } = changeTimeStyles();

    const minDate = new Date(
        moment().subtract(2, 'months').startOf('month').format('YYYY-MM-DD')
    );

    //for disable date
    const excludeCustomDates = (date) => {
        const datesArray = isDisableDate.map((item) => item);
        if (date.getDay() === 0 || date.getDay() === 6) {
            return true;
        }
        const formattedDate = moment(date).format('YYYY-MM-DD');

        const updateDate = !datesArray.includes(formattedDate);
        return updateDate;
    };

    const handleTimeChange = (e) => {
        let formattedTime = e.target.value.replace(/\D/g, '');
        if (formattedTime.length > 2) {
            formattedTime = `${formattedTime.slice(0, 2)}:${formattedTime.slice(
                2
            )}`;
        }
        if (formattedTime.length > 5) {
            return;
        }
        form.setFieldValue('time', formattedTime);
    };
    return (
        <Box p={'0 80px'} h={'250px'}>
            <DatePickerInput
                withAsterisk
                w={'100%'}
                radius='sm'
                icon={<IconCalendar size='1.1rem' stroke={1.5} />}
                mt={'30px'}
                popoverProps={{ withinPortal: true }}
                placeholder='Select a date'
                variant='filled'
                label={'Date'}
                firstDayOfWeek={0}
                maxLevel={'year'}
                excludeDate={excludeCustomDates}
                {...form.getInputProps('date')}
                maxDate={new Date()}
                minDate={minDate}
                onChange={(date) => {
                    getTimeSheetData(date);
                    form.setFieldValue('date', date);
                }}
                classNames={{
                    label: classes.label,
                    input: classes.input,
                    error: classes.error,
                    wrapper: classes.wrapper,
                }}
            />

            <Box mt={30}>
                <Text fz={14} fw={500} c='#252F4A' mb={5}>
                    Select Change Time Type
                </Text>
                <SegmentedControl
                    color='blue'
                    transitionDuration={500}
                    transitionTimingFunction='linear'
                    defaultValue={CHANGE_TIMESHEET_TYPE[0].value}
                    data={CHANGE_TIMESHEET_TYPE}
                    onChange={(val) => {
                        setChangeTime(val);
                        form.setFieldValue('time', '');
                    }}
                    classNames={{
                        input: classes.input,
                    }}
                />
            </Box>

            <Flex justify={'center'} gap={15}>
                <TextInput
                    placeholder='00:00'
                    disabled
                    maxLength={5}
                    mt={24}
                    label={ChangeTime === 'In' ? 'Old In Time' : 'Old Out time'}
                    defaultValue={
                        ChangeTime === 'In'
                            ? timeSheetData.inTime
                            : timeSheetData.outTime
                    }
                    variant='filled'
                    className='time-input'
                    classNames={{
                        label: classes.label,
                        wrapper: classes.wrapper,
                    }}
                />
                <TextInput
                    placeholder='00:00'
                    maxLength={5}
                    variant='filled'
                    mt={24}
                    label={ChangeTime === 'In' ? 'New In Time' : 'New Out time'}
                    classNames={{
                        label: classes.label,
                        input: classes.input,
                        wrapper: classes.wrapper,
                    }}
                    withAsterisk
                    {...form.getInputProps('time')}
                    onChange={(e) => {
                        handleTimeChange(e);
                    }}
                />
            </Flex>
        </Box>
    );
};

export default ChangeTimeSheetForm;