import React, { FC } from 'react';
import Lottie from 'react-lottie';
import { Badge, Box, Checkbox, Flex, Text } from '@mantine/core';

import { dateFormate } from 'shared/util/utility';

import { ILeaveReviewProps } from '../interface/request';

interface ILeaveDataProps {
    leaveData: ILeaveReviewProps;
}
const LeaveDetails: FC<ILeaveDataProps> = ({ leaveData }) => {
    return (
        <Box>
            <Flex
                mt={20}
                mb={40}
                align={'center'}
                justify={'center'}
                sx={{
                    border: '1px dashed #40c057',
                    background: '#F1FAFF',
                    borderRadius: '16px',
                }}
                p={15}>
                <Box>
                    {' '}
                    <Text fz={14} fw={400} c={'#40c057'} ta={'center'}>
                        Thank you for providing your leave details.
                    </Text>
                    <Text fz={14} fw={400} c={'#40c057'} ta={'center'}>
                        Please review and submit.
                    </Text>
                </Box>
            </Flex>
            <Box
                sx={{
                    width: '100%',
                    margin: '0 auto',
                    textAlign: 'center',
                }}>
                <Flex w={'100%'} justify={'center'} mt={10}>
                    <Box sx={{ width: '50%' }}>
                        <Text fw={600} fz={'14px'} mb={5}>
                            From Date
                        </Text>
                        <Badge size='lg' radius='md'>
                            {dateFormate(leaveData.startDate)}
                        </Badge>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Text fz={'14px'} fw={600} mb={5}>
                            To Date
                        </Text>
                        <Badge size='lg' radius='md'>
                            {dateFormate(leaveData.endDate)}
                        </Badge>
                    </Box>
                </Flex>

                <Flex w={'100%'} mt={20}>
                    <Box sx={{ width: '50%' }}>
                        <Text fw={600} fz={'14px'} mb={5}>
                            Leave Type
                        </Text>
                        <Text fw='600' fz='14px' color='#40c057'>
                            {leaveData.leavetype}
                        </Text>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Text color='' fz={'14px'} fw={600} mb={5}>
                            Total Day
                        </Text>
                        <Text size='lg' fz='14px' fw={600} color='#228be6'>
                            {leaveData.totalDay}
                        </Text>
                    </Box>
                </Flex>

                <Flex
                    mt={20}
                    sx={{
                        width: '100%',
                    }}>
                    <Box sx={{ width: '50%' }}>
                        <Text color='' fw={600} fz={'14px'} mb={5}>
                            Duration
                        </Text>
                        <Text fz='14px' color='#B5B5C3' fw={600}>
                            {' '}
                            {leaveData.duration}
                        </Text>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Text color='' fw={600} fz={'14px'} mb={5}>
                            Reason
                        </Text>
                        <Text fz='14px' color='#B5B5C3' fw={600}>
                            {leaveData.reason}
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default LeaveDetails;
