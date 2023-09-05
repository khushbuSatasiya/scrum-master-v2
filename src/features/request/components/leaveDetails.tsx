import { Badge, Box, Flex, Text } from '@mantine/core';
import React, { FC } from 'react';
import { dateFormate } from 'shared/util/utility';
import { ILeaveReviewProps } from '../interface/request';

interface ILeaveDataProps {
    leaveData: ILeaveReviewProps;
}
const LeaveDetails: FC<ILeaveDataProps> = ({ leaveData }) => {
    return (
        <Flex>
            <Box
                sx={{
                    width: '100%',
                }}>
                <Flex w={'100%'} justify={'center'} mt={10}>
                    <Box sx={{ width: '50%' }}>
                        <Text fw={600} fz={'14px'}>
                            From
                        </Text>
                        <Badge size='lg' radius='md'>
                            {dateFormate(leaveData.startDate)}
                        </Badge>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Text fz={'14px'} fw={600}>
                            To
                        </Text>
                        <Badge size='lg' radius='md'>
                            {dateFormate(leaveData.endDate)}
                        </Badge>
                    </Box>
                </Flex>

                <Flex w={'100%'} mt={20}>
                    <Box sx={{ width: '50%' }}>
                        <Text fw={600} fz={'14px'}>
                            Leave Type
                        </Text>
                        <Text fw='600' fz='14px' color='#40c057'>
                            {leaveData.leavetype}
                        </Text>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Text color='' fz={'14px'} fw={600}>
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
                        <Text color='' fw={600} fz={'14px'}>
                            Duration
                        </Text>
                        <Text fz='14px' color='#B5B5C3' fw={600}>
                            {' '}
                            {leaveData.duration}
                        </Text>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Text color='' fw={600} fz={'14px'}>
                            Reason
                        </Text>
                        <Text fz='14px' color='#B5B5C3' fw={600}>
                            {leaveData.reason}
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
};

export default LeaveDetails;
