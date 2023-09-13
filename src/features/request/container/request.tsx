import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Flex, Paper, Text } from '@mantine/core';
import { isEmpty } from 'lodash';

import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { IProjectsProps } from 'features/project/interface/project';

import {
    IChangeTimeSheet,
    ILeaveRequestProps,
    IUpComingLeave,
} from '../interface/request';
import LeaveRequest from '../components/leaveRequest';
import ChangeTimeSheet from '../components/changeTimeSheet';

const Request: FC<IProjectsProps> = ({ uId }) => {
    const [leaveRequest, setLeaveRequest] = useState({} as ILeaveRequestProps);
    const [changeTimeSheet, setChangeTimeSheet] = useState(
        {} as IChangeTimeSheet
    );
    const [isVacational, setIsVacational] = useState(false);
    const [isDisableDate, setIsDisableDate] = useState([]);
    const [isUpcomingLeave, setIsUpcomingLeave] = useState<IUpComingLeave[]>();

    const REQUEST_ARR = [
        {
            name: 'Request A Leave',
            title1: ' Please submit your leave request for approval.',
            onClick: () => {
                setLeaveRequest({
                    startDay: null,
                    endDay: null,
                    duration: '',
                    reason: '',
                    leaveType: '',
                });
            },
        },
        {
            name: 'Add Missing Day',
            title1: 'Please add the missing day to your schedule. Thank you!',
        },
        {
            name: 'Change Time Request',
            title1: 'Please submit your change time request for us to process. Thank you!',
            onClick: () => {
                setChangeTimeSheet({
                    date: null,
                    changeTimeType: '',
                    time: '',
                });
            },
        },
        {
            name: 'Work From Home',
            title1: 'Enjoy the flexibility of working from home and boost your productivity.Stay connected and thrive',
        },
    ];
    //API call for getting Leave info
    const getLeaveRequestInfo = useCallback(() => {
        httpService
            .get(`${API_CONFIG.path.leaveRequest}/${uId}`)
            .then((res) => {
                setIsVacational(res.data.isVacational);
                setIsUpcomingLeave(res.data.upcomingLeave);
            })
            .catch((error) => {
                console.error('error', error);
            });
    }, [uId]);

    //APi call for getting Disable Date
    const getDateForChangeTimeSheet = useCallback(() => {
        httpService
            .get(`${API_CONFIG.path.changeTimeSheet}`)
            .then((res) => {
                setIsDisableDate(res.data.date);
            })
            .catch((error) => {
                console.error('error', error);
            });
    }, [uId]);

    useEffect(() => {
        getLeaveRequestInfo();
        getDateForChangeTimeSheet();
    }, []);

    return (
        <Flex wrap={'wrap'} w={'100%'} gap={10} justify={'space-between'}>
            {REQUEST_ARR.map(({ name, title1, onClick }, index) => {
                return (
                    <Paper
                        key={index}
                        shadow='sm'
                        radius='lg'
                        mt={30}
                        w={'49%'}
                        p='lg'
                        sx={{
                            width: '100%',
                            height: 'auto',
                            scrollbarWidth: 'none',
                            '::-webkit-scrollbar': {
                                width: '0.5em',
                                display: 'none',
                            },
                            '::-webkit-scrollbar-thumb': {
                                backgroundColor: '#888',
                            },
                        }}>
                        <Flex
                            direction={'column'}
                            align={'center'}
                            justify={'center'}
                            sx={{
                                border: '1px dashed #228be6',
                                background: '#F1FAFF',
                                borderRadius: '16px',
                                height: '130px',
                            }}
                            p={15}>
                            <Text
                                fz={12}
                                fw={600}
                                tt='uppercase'
                                c={'#228be6'}
                                ta={'center'}>
                                {title1}
                            </Text>

                            <Button mt={10} onClick={onClick}>
                                {name}
                            </Button>
                        </Flex>
                    </Paper>
                );
            })}

            {!isEmpty(leaveRequest) && (
                <LeaveRequest
                    onClose={() => setLeaveRequest({} as ILeaveRequestProps)}
                    leaveRequest={leaveRequest}
                    isOpen={!isEmpty(leaveRequest)}
                    isVacational={isVacational}
                    isUpcomingLeave={isUpcomingLeave}
                    getLeaveRequestInfo={getLeaveRequestInfo}
                />
            )}

            {!isEmpty(changeTimeSheet) && (
                <ChangeTimeSheet
                    onClose={() => setChangeTimeSheet({} as IChangeTimeSheet)}
                    changeTimeSheet={changeTimeSheet}
                    isOpen={!isEmpty(changeTimeSheet)}
                    isDisableDate={isDisableDate}
                />
            )}
        </Flex>
    );
};

export default Request;
