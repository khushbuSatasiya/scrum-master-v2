import { Box, Button, Flex, Paper, Text } from '@mantine/core';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { IProjectsProps } from 'features/project/interface/project';
import { ILeaveRequestProps } from '../interface/request';
import LeaveRequest from '../components/leaveRequest';
import { isEmpty } from 'lodash';
import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';

const Request: FC<IProjectsProps> = ({ uId }) => {
    const [leaveRequest, setLeaveRequest] = useState({} as ILeaveRequestProps);
    const [isVacational, setIsVacational] = useState(false);
    const [isUpcomingLeave, setIsUpcomingLeave] = useState([]);

    const REQUEST_ARR = [
        {
            name: 'Request A Leave',
            title1: ' Please submit your leave request for approval.',
            title2: '  Include dates and reason. Thank you!"',
            onClick: () => {
                setLeaveRequest({
                    startDay: null,
                    endDay: null,
                    duration: '',
                    reason: '',
                });
            },
        },
        {
            name: 'Add Missing Day',
            title1: 'Please add the missing day to your schedule. Thank you!',
            title2: '',
        },
        {
            name: 'Change Time Request',
            title1: 'Please submit your change time request for us to process. Thank you!',
            title2: '',
        },
        {
            name: 'Work From Home',
            title1: 'Enjoy the flexibility of working from home and boost your productivity.',
            title2: 'Stay connected and thrive',
        },
    ];

    const getLeaveRequestInfo = useCallback(() => {
        httpService
            .get(`${API_CONFIG.path.leaveRequest}/${uId}`)
            .then((res) => {
                setIsVacational(res.data.isVacational);
                setIsUpcomingLeave(res.data.upcomingLeave);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, [uId]);

    useEffect(() => {
        getLeaveRequestInfo();
    }, []);
    return (
        <Box>
            {REQUEST_ARR.map(({ name, title1, title2, onClick }, index) => {
                return (
                    <Paper
                        key={index}
                        shadow='sm'
                        radius='lg'
                        mt={30}
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
                            }}
                            p={15}>
                            <Text
                                fz={12}
                                fw={600}
                                tt='uppercase'
                                c={'#228be6'}
                                lh={3}>
                                {title1}
                            </Text>
                            <Text fz={12} fw={600} tt='uppercase' c={'#228be6'}>
                                {title2}
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
                />
            )}
        </Box>
    );
};

export default Request;
