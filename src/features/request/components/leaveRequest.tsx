import React, { FC, useState } from 'react';
import {
    Box,
    Button,
    Divider,
    Flex,
    Group,
    Modal,
    Stepper,
    Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Icon12Hours, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import moment from 'moment';
import Lottie from 'react-lottie';
import { isEmpty } from 'lodash';

import checkedJson from 'assets/lotties/checked.json';
import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';

import {
    ILeaveRequestProps,
    ILeaveReviewProps,
    IUpComingLeave,
} from '../interface/request';
import { useStyles } from '../constants/requestConstants';

import LeaveDetails from './leaveDetails';
import LeaveForm from './leaveForm';

import '../style/request.scss';

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
    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: checkedJson,
    };

    const { startDay, endDay, reason, duration, leaveType } = leaveRequest;
    const { classes } = useStyles();

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
    if (isVacational) {
        validationRules.leaveType = (value) =>
            isEmpty(value) ? 'Leave Type is required' : null;
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
                .then(() => {
                    getLeaveRequestInfo();
                    nextStep();
                    setTimeout(() => {
                        onClose();
                    }, 4000);
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
            withCloseButton={true}
            opened={isOpen}
            onClose={onClose}
            classNames={{
                header: classes.header,
                close: classes.close,
            }}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Text ta={'center'} fw={600} c={'#071437'} fz={22} mb={5}>
                    Request A Leave
                </Text>

                <Text ta={'center'} c={'#99A1B7'} fz={16} fw={500} mb={20}>
                    If you need more info, please check{' '}
                    <span
                        style={{
                            color: '#228be6',
                        }}>
                        Leave Policy
                    </span>
                    .
                </Text>
                <Divider variant='dashed' mt={10} mb={20} />
                <Stepper
                    color={leaveData.action === 'Error' ? 'red' : 'green'}
                    active={active}
                    breakpoint='sm'
                    size='xs'
                    iconSize={25}
                    p={'0 80px'}
                    completedIcon={<IconCheck size={'20px'} />}>
                    <Stepper.Step label='' description=''>
                        <LeaveForm
                            leaveRequest={leaveRequest}
                            isUpcomingLeave={isUpcomingLeave}
                            isVacational={isVacational}
                            isReview={isReview}
                            validationRules={validationRules}
                            form={form}
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
                    <Stepper.Step label='' description=''>
                        <Box>
                            <Text tt={'uppercase'} fz={16} fw={600} mb={30}>
                                Your Leave Request Submitted Successfully.
                            </Text>
                            <Lottie
                                options={defaultOptions}
                                height={150}
                                width={150}
                            />
                        </Box>
                    </Stepper.Step>
                </Stepper>

                {active + 1 !== 3 && (
                    <Group position='center' mt='35px' mb={10}>
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
                )}
            </form>
        </Modal>
    );
};

export default LeaveRequest;
