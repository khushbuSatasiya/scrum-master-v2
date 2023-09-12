import React, { FC, useState } from 'react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import Lottie from 'react-lottie';
import {
    Anchor,
    Box,
    Button,
    Divider,
    Flex,
    Group,
    Modal,
    Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';

import checkedJson from 'assets/lotties/checked.json';

import {
    ILeaveRequestProps,
    ILeaveReviewProps,
    IUpComingLeave,
} from '../interface/request';
import { DURATION, useStyles } from '../constants/requestConstants';

import LeaveDetails from './leaveDetails';
import LeaveForm from './leaveForm';

interface ILeaveProps {
    leaveRequest: ILeaveRequestProps;
    isOpen: boolean;
    isUpcomingLeave: IUpComingLeave[];
    isVacational: boolean;
    getLeaveRequestInfo: () => void;
    onClose: () => void;
}
const LeaveRequest: FC<ILeaveProps> = ({
    leaveRequest,
    isOpen,
    isVacational,
    isUpcomingLeave,
    getLeaveRequestInfo,
    onClose,
}) => {
    const { startDay, endDay, reason, duration, leaveType } = leaveRequest;
    const { classes } = useStyles();

    const [leaveData, setLeaveData] = useState({} as ILeaveReviewProps);
    const [isReview, setIsReview] = useState(false);
    const [active, setActive] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const [leaveDuration, setLeaveDuration] = useState('Full');

    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: checkedJson,
    };

    const validationRules: Record<string, any> = {
        startDay: (value) => value === null && ' ',
        duration: (value) => value === '' && '  ',
        reason: (value) => value === '' && '  ',
    };

    if (!DURATION.includes(leaveDuration)) {
        validationRules.endDay = (value) => value === null && ' ';
    }
    if (isVacational) {
        validationRules.leaveType = (value) => isEmpty(value) && ' ';
    }

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
        const endDate = endDay
            ? moment(endDay).format('YYYY-MM-DD')
            : startDate;

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
                .then(() => {
                    getLeaveRequestInfo();
                    nextStep();
                    setIsSubmit(true);
                    setTimeout(() => {
                        onClose();
                    }, 2000);
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
            classNames={{
                header: classes.header,
                close: classes.close,
            }}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Flex direction={'column'} justify={'center'}>
                    <Box>
                        <Text ta={'center'} fw={700} c={'#071437'} fz={22}>
                            Request A Leave
                        </Text>

                        <Text
                            ta={'center'}
                            c={'#99A1B7'}
                            fz={14}
                            fw={500}
                            mb={10}>
                            If you need more info, please check{' '}
                            <Anchor
                                href='https://docs.google.com/document/d/1TfUVxotVmZ1Ctj2flcuOwzVNUr-UL99H/edit'
                                target='_blank'
                                sx={{
                                    color: '#228be6',
                                    '&:hover': {
                                        textDecoration: 'none',
                                    },
                                }}>
                                Leave Policy
                            </Anchor>
                            .
                        </Text>
                        <Divider variant='dashed' mt={15} mb={5} />
                    </Box>

                    <Box>
                        {!isReview && (
                            <Box p={'0 80px'} h={'320px'} mt={20}>
                                <LeaveForm
                                    leaveRequest={leaveRequest}
                                    isUpcomingLeave={isUpcomingLeave}
                                    isVacational={isVacational}
                                    validationRules={validationRules}
                                    form={form}
                                    leaveDuration={leaveDuration}
                                    setLeaveDuration={setLeaveDuration}
                                />
                            </Box>
                        )}

                        {isReview && !isSubmit && (
                            <Box>
                                {leaveData.action === 'Success' && (
                                    <Box p={'0 80px'} h={'320px'}>
                                        <LeaveDetails leaveData={leaveData} />
                                    </Box>
                                )}

                                {leaveData.action === 'Error' && (
                                    <Flex
                                        mt={30}
                                        p={'0 80px'}
                                        h={'320px'}
                                        justify={'center'}
                                        align={'center'}>
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
                                    </Flex>
                                )}
                            </Box>
                        )}

                        {isReview && isSubmit && (
                            <Flex
                                h={'320px'}
                                p={'0 80px'}
                                direction={'column'}
                                justify={'center'}
                                align={'center'}>
                                <Text tt={'uppercase'} fz={16} fw={600} mb={30}>
                                    Your Leave Request Submitted Successfully.
                                </Text>
                                <Lottie
                                    options={defaultOptions}
                                    height={120}
                                    width={120}
                                    speed={1.5}
                                />
                            </Flex>
                        )}
                    </Box>

                    {active + 1 !== 3 && (
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
                                onClick={isReview ? prevStep : onClose}>
                                {isReview ? 'Back' : 'Cancel'}
                            </Button>

                            <Button
                                w={100}
                                fz={14}
                                type='submit'
                                disabled={
                                    isReview
                                        ? leaveData.action === 'Error'
                                        : false
                                }>
                                {isReview ? 'Submit' : 'Next'}
                            </Button>
                        </Group>
                    )}
                </Flex>
            </form>
        </Modal>
    );
};

export default LeaveRequest;