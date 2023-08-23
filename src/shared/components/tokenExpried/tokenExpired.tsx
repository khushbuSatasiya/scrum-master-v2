import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Paper, Space, Text } from '@mantine/core';
import { IconAlertTriangle, IconRefreshAlert } from '@tabler/icons-react';
import authService from 'shared/services/auth.service';

const TokenExpired = () => {
    useEffect(() => {
        authService.removeAuthData();
    }, []);
    return (
        <Flex justify={'center'} align={'center'} h={'80vh'}>
            <Paper
                shadow='sm'
                radius='lg'
                sx={{
                    width: 550,
                    margin: '0 auto',
                    padding: '60px 65px',
                }}>
                <Flex
                    justify='center'
                    align='center'
                    direction='column'
                    gap='55px'>
                    <Flex justify='center' align='center' direction='column'>
                        <IconAlertTriangle size='120' color='red' />
                        <Space h='md' />
                        <Text fw={700} fz={25}>
                            Token Expired!
                        </Text>
                        <Text c='dimmed'>Please try again..!!</Text>
                    </Flex>
                </Flex>
            </Paper>
        </Flex>
    );
};

export default TokenExpired;
