import React, { FC, useState } from 'react';
import { IChangeTimeSheet } from '../interface/request';
import {
    Box,
    Button,
    Divider,
    Flex,
    Group,
    Modal,
    SegmentedControl,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { CHANGE_TIMESHEET_TYPE } from '../constants/requestConstants';
import moment from 'moment';
import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';

interface IChangeTimeProps {
    changeTimeSheet: IChangeTimeSheet;
    isOpen: boolean;
    isDisableDate: any;
    onClose: () => void;
}
const ChangeTimeSheet: FC<IChangeTimeProps> = ({
    changeTimeSheet,
    isDisableDate,
    isOpen,
    onClose,
}) => {
    const { date, changeTimeType, time } = changeTimeSheet;
    const [isLoading, setIsLoading] = useState(false);
    const [ChangeTime, setChangeTime] = useState('In');
    const [timeSheetData, setTimeSheetData] = useState({
        date: null,
        inTime: '',
        outTime: '',
    });
    const form = useForm({
        initialValues: {
            date: timeSheetData.date,
            changeTimeType: changeTimeType,
            time: time,
        },
        validate: {
            date: (value) => value === null && ' ',
            time: (value) => value === '' && '  ',
        },
    });

    const excludeCustomDates = (date) => {
        const datesArray = isDisableDate.map((item) => item);
        if (date.getDay() === 0 || date.getDay() === 6) {
            return true;
        }
        const formattedDate = moment(date).format('YYYY-MM-DD');

        const updateDate = !datesArray.includes(formattedDate);
        return updateDate;
    };

    const getTimeSheetData = (date) => {
        const payload = {
            date: moment(date).format('YYYY-MM-DD'),
        };
        httpService
            .get(API_CONFIG.path.timeSheet, payload)
            .then((res) => {
                setTimeSheetData(res.data);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const handleSubmit = (values) => {
        console.log('handleSubmit ~ values:', values);
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
            onClose={onClose}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Flex direction={'column'} justify={'center'}>
                    <Box>
                        <Text ta={'center'} fw={700} c={'#071437'} fz={22}>
                            Change Time Sheet
                        </Text>

                        <Divider variant='dashed' mt={15} mb={5} />
                    </Box>

                    <Box p={'0 80px'} h={'320px'}>
                        <DatePickerInput
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
                            onChange={(date) => {
                                getTimeSheetData(date);
                                form.setFieldValue('date', date);
                            }}
                        />

                        <SegmentedControl
                            color='blue'
                            mt={'30px'}
                            transitionDuration={500}
                            transitionTimingFunction='linear'
                            defaultValue={CHANGE_TIMESHEET_TYPE[0].value}
                            data={CHANGE_TIMESHEET_TYPE}
                            onChange={(val) => setChangeTime(val)}
                        />

                        <Flex justify={'center'} gap={15}>
                            <TextInput
                                placeholder='00:00'
                                disabled
                                maxLength={5}
                                mt={24}
                                label={
                                    ChangeTime === 'In' ? 'In Time' : 'Out time'
                                }
                                defaultValue={
                                    ChangeTime === 'In'
                                        ? timeSheetData.inTime
                                        : timeSheetData.outTime
                                }
                                labelProps={{ style: { color: '#5e6278' } }}
                            />
                            <TextInput
                                placeholder='00:00'
                                maxLength={5}
                                mt={24}
                                label={
                                    ChangeTime === 'In' ? 'In Time' : 'Out time'
                                }
                                value={form.values.time}
                                labelProps={{ style: { color: '#5e6278' } }}
                                {...form.getInputProps('time')}
                            />
                        </Flex>
                    </Box>

                    <Group position='center' mt='80px' mb={20}>
                        <Button
                            variant='default'
                            sx={{
                                background: '#F9F9F9',
                                color: '#99A1B7',
                                border: 'none',
                            }}
                            w={100}
                            fz={14}
                            onClick={onClose}>
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

                                variant: 'oval',
                            }}
                            type='submit'
                            disabled={isLoading}>
                            {isLoading ? '' : 'Submit'}
                        </Button>
                    </Group>
                </Flex>
            </form>
        </Modal>
    );
};

export default ChangeTimeSheet;
