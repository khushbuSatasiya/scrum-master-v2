import React, { FC, useEffect, useState } from 'react';
import {
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    Group,
    Modal,
    Select,
    Stepper,
    Text,
    TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar, IconCheck } from '@tabler/icons-react';
import {
    LEAVE_DURATION,
    LEAVE_TYPE,
    useStyles,
} from '../constants/requestConstants';
import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { notifications } from '@mantine/notifications';
import moment from 'moment';
import { ILeaveRequestProps, ILeaveReviewProps } from '../interface/request';
import { dateFormate } from 'shared/util/utility';

import '../style/request.scss';
import LeaveDetails from './leaveDetails';
import LeaveForm from './leaveForm';

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
    const { startDay, endDay, reason, duration, leaveType } = leaveRequest;

    const [leaveData, setLeaveData] = useState({} as ILeaveReviewProps);
    const [isReview, setIsReview] = useState(false);
    const [active, setActive] = useState(0);

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

    const nextStep = () => {
        setActive((current) => (current < 3 ? current + 1 : current));
    };
    const prevStep = () => {
        setIsReview(false);
        setActive((current) => (current > 0 ? current - 1 : current));
    };

    const handleSubmit = (values) => {
        const { startDay, endDay, duration, reason, leaveType } = values;
        const startDate = moment(startDay).format('YYYY-MM-DD');
        const endDate = moment(endDay).format('YYYY-MM-DD');

        const params = {
            startDate: startDate,
            endDate: endDate,
            duration: duration,
            reason: reason,
            leaveType: isVacational ? leaveType : 'Paid',
        };

        const onError = (err) => {
            console.error('Error', err);
            notifications.show({
                message: err.response.data.message,
                color: 'red',
            });
        };

        if (isReview) {
            httpService
                .post(`${API_CONFIG.path.leaveRequest}`, params)
                .then((res) => {
                    onClose();
                    notifications.show({
                        message: res.message,
                        color: 'green',
                    });
                })
                .catch(onError);
        } else {
            httpService
                .post(`${API_CONFIG.path.leaveRequest}/review`, params)
                .then((res) => {
                    setLeaveData(res.data);
                    setIsReview(true);
                    nextStep();
                })
                .catch(onError);
        }
    };

    useEffect(() => {
        if (isVacational) {
            validationRules.leaveType = (value) =>
                value === '' ? 'Leave Type is required' : null;
        }
    }, []);
    return (
        <>
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
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Text ta={'center'} fw={600} c={'#071437'} fz={22}>
                        Request For A Leave
                    </Text>
                    <Divider variant='dashed' mt={10} mb={20} />
                    <Stepper
                        classNames={{ content: classes.content }}
                        color={leaveData.action === 'Error' ? 'red' : 'green'}
                        active={active}
                        onStepClick={setActive}
                        breakpoint='sm'
                        size='xs'
                        iconSize={25}
                        completedIcon={<IconCheck size={'20px'} />}>
                        <Stepper.Step label='' description=''>
                            {/*<Box
                                className={
                                    isReview ? 'slide-left' : 'slide-right'
                                }>
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
                                        icon={
                                            <IconCalendar
                                                size='1.1rem'
                                                stroke={1.5}
                                            />
                                        }
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
                                        icon={
                                            <IconCalendar
                                                size='1.1rem'
                                                stroke={1.5}
                                            />
                                        }
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
                            </Box>*/}

                            <LeaveForm
                                leaveRequest={leaveRequest}
                                isUpcomingLeave={isUpcomingLeave}
                                isVacational={isVacational}
                                isReview={isReview}
                            />
                        </Stepper.Step>
                        <Stepper.Step label='' description=''>
                            <Box className={isReview ? 'slide-left' : ''}>
                                {leaveData.action === 'Success' && (
                                    <LeaveDetails leaveData={leaveData} />
                                )}

                                {leaveData.action === 'Error' && (
                                    <Box mt={30}>
                                        <Flex
                                            direction={'column'}
                                            align={'center'}
                                            justify={'center'}
                                            sx={{
                                                border: '1px dashed #fa5252',
                                                background: '#F1FAFF',
                                                borderRadius: '16px',
                                            }}
                                            p={15}>
                                            <Text
                                                fz={12}
                                                fw={600}
                                                tt='uppercase'
                                                c={'#fa5252'}
                                                ta={'center'}>
                                                {leaveData.message}
                                            </Text>
                                        </Flex>
                                    </Box>
                                )}
                            </Box>
                        </Stepper.Step>
                    </Stepper>

                    <Group position='center' mt='xl' mb={10}>
                        {isReview && (
                            <Button variant='default' onClick={prevStep}>
                                Back
                            </Button>
                        )}

                        <Button
                            type='submit'
                            disabled={
                                isReview ? leaveData.action === 'Error' : false
                            }>
                            {isReview ? 'Submit' : 'Next'}
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
};

export default LeaveRequest;
