import React, { FC } from 'react';
import { isEmpty } from 'lodash';
import { Badge, Flex, List, Modal, ThemeIcon } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { useStyles } from '../constant/constant';

interface ITimeTaskModalProps {
    task: Record<string, any>;
    onClose: () => void;
}
const TimesheetTaskModal: FC<ITimeTaskModalProps> = ({ task, onClose }) => {
    const { classes } = useStyles();

    return (
        <Modal
            size='xl'
            opened={!isEmpty(task)}
            onClose={onClose}
            title='Daily Tasks'
            classNames={{
                title: classes.title,
                header: classes.header,
                close: classes.close,
            }}>
            <Flex p={10} align={'flex-start'} justify='space-evenly' gap={80}>
                <Flex direction='column'>
                    <Badge
                        size='lg'
                        variant='light'
                        radius='md'
                        sx={{ width: '180px' }}
                        p={'10px'}
                        color='green'>
                        Planned Tasks
                    </Badge>
                    <List
                        mt={10}
                        size='md'
                        icon={
                            <ThemeIcon color='white' size={24} radius='xl'>
                                <IconCircleCheck size='18px' fill='#40c057' />
                            </ThemeIcon>
                        }>
                        {task &&
                            task.plannedTasks &&
                            task.plannedTasks.split('\n').map((item) => (
                                <List.Item
                                    key={item}
                                    sx={{ fontSize: '14px', fontWeight: 600 }}>
                                    {item}
                                </List.Item>
                            ))}
                    </List>
                </Flex>
                <Flex direction='column'>
                    <Badge
                        size='lg'
                        variant='light'
                        radius={'md'}
                        sx={{ width: '180px' }}
                        color='orange'>
                        Completed Tasks
                    </Badge>
                    <List
                        mt={10}
                        size='md'
                        icon={
                            <ThemeIcon color='white' size={24} radius='xl'>
                                <IconCircleCheck size='18px' fill='#fd7e14' />
                            </ThemeIcon>
                        }>
                        {task &&
                            task.completedTasks &&
                            task.completedTasks.split('\n').map((item) => (
                                <List.Item
                                    key={item}
                                    sx={{ fontSize: '14px', fontWeight: 600 }}>
                                    {item}
                                </List.Item>
                            ))}
                    </List>
                </Flex>
            </Flex>
        </Modal>
    );
};

export default TimesheetTaskModal;
