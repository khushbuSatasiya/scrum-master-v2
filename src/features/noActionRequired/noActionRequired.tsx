import React, { FC } from 'react';
import {
    Badge,
    Box,
    Divider,
    Flex,
    List,
    Paper,
    Text,
    ThemeIcon,
} from '@mantine/core';
import { IconChecklist } from '@tabler/icons-react';

import { formatDate, formatTime } from 'shared/util/utility';

interface IProps {
    actionTime: any;
    date: string;
    tasks: any;
    totalHours: string;
}
const NoActionRequired: FC<IProps> = ({
    actionTime,
    tasks,
    date,
    totalHours,
}) => {
    return (
        <Box mt={45}>
            <Paper p={20} radius={'lg'}>
                <Flex justify={'space-between'} align={'center'} p={'10px 0px'}>
                    <Flex>
                        <Flex>
                            <Text fz={14} fw={600} tt='uppercase'>
                                in :
                            </Text>
                            <Text fz={14} fw={600} ml={5} color='green'>
                                {formatTime(actionTime.inTime)}
                            </Text>
                        </Flex>
                        <Flex ml={20}>
                            <Text fz={14} fw={600} tt='uppercase'>
                                out :
                            </Text>
                            <Text ml={5} fz={14} fw={600} color='#fd7e14'>
                                {formatTime(actionTime.outTime)}
                            </Text>
                        </Flex>
                    </Flex>
                    <Text fz={14} fw={600} ml={5} c={'blue'}>
                        {formatDate(date)}
                    </Text>
                    <Box>
                        <Flex>
                            <Text fz={14} fw={600} tt='uppercase'>
                                Total Hours :
                            </Text>
                            <Text fz={14} fw={600} ml={5} c={'green'}>
                                {totalHours}
                            </Text>
                        </Flex>
                    </Box>
                </Flex>

                <Divider variant='dashed' mt={10} mb={20} />

                <Flex align={'flex-start'} justify={'center'} gap={80}>
                    <Flex direction='column' w={'100%'}>
                        <Flex
                            justify={'space-between'}
                            gap={30}
                            mb={10}
                            p={'0px 20px'}>
                            <Box sx={{ width: '50%' }}>
                                <Badge
                                    size='lg'
                                    variant='light'
                                    radius='md'
                                    sx={{ width: '180px' }}
                                    p={'10px'}
                                    color='green'>
                                    Planned Tasks
                                </Badge>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Badge
                                    size='lg'
                                    variant='light'
                                    radius={'md'}
                                    sx={{ width: '180px' }}
                                    color='orange'>
                                    Completed Tasks
                                </Badge>
                            </Box>
                        </Flex>

                        <List mt={10} size='md' listStyleType={'circle'}>
                            {tasks.map((item, index) => (
                                <Paper
                                    mb={20}
                                    shadow='lg'
                                    p='md'
                                    key={index}
                                    sx={{ border: '1px solid #f3f4fa' }}>
                                    <Flex>
                                        <ThemeIcon
                                            color='white'
                                            size={24}
                                            radius='xl'
                                            mr={5}>
                                            <IconChecklist
                                                size='25px'
                                                color='#228be6'
                                            />
                                        </ThemeIcon>
                                        <Text fw={700} mb={10} fz={20}>
                                            {item.projectDetails.projectName}
                                        </Text>
                                    </Flex>
                                    <Flex
                                        justify={'space-between'}
                                        w={'100%'}
                                        gap={30}>
                                        <Box sx={{ width: '50%' }}>
                                            {item.taskCreate
                                                .split('\n')
                                                .filter(
                                                    (task) => task.trim() !== ''
                                                )
                                                .map((task, index) => {
                                                    return (
                                                        <List.Item
                                                            key={index}
                                                            sx={{
                                                                fontSize:
                                                                    '14px',
                                                            }}>
                                                            <Text
                                                                sx={{
                                                                    maxWidth:
                                                                        '500px',
                                                                    wordWrap:
                                                                        'break-word',
                                                                    textWrap:
                                                                        'balance',
                                                                }}>
                                                                {task}
                                                            </Text>
                                                        </List.Item>
                                                    );
                                                })}
                                        </Box>
                                        <Box sx={{ width: '50%' }}>
                                            {item.taskDone
                                                .split('\n')
                                                .filter(
                                                    (task) => task.trim() !== ''
                                                )
                                                .map((task, index) => {
                                                    return (
                                                        <Flex key={index}>
                                                            <List.Item
                                                                sx={{
                                                                    fontSize:
                                                                        '14px',
                                                                }}>
                                                                <Text
                                                                    sx={{
                                                                        maxWidth:
                                                                            '500px',
                                                                        wordWrap:
                                                                            'break-word',
                                                                        textWrap:
                                                                            'balance',
                                                                    }}>
                                                                    {task}
                                                                </Text>
                                                            </List.Item>
                                                        </Flex>
                                                    );
                                                })}
                                        </Box>
                                    </Flex>
                                </Paper>
                            ))}
                        </List>
                    </Flex>
                </Flex>
            </Paper>
        </Box>
    );
};

export default NoActionRequired;
