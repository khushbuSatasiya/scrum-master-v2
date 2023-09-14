import React, { FC } from 'react';

import { Flex, Paper, Text } from '@mantine/core';

const GuestUser: FC = () => {
    return (
        <Paper
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
                <Text fz={12} fw={600} tt='uppercase' c={'#228be6'} lh={3}>
                    To manage check-ins and check-outs,
                </Text>
                <Text fz={12} fw={600} tt='uppercase' c={'#228be6'}>
                    please reach out to the HR department.
                </Text>
            </Flex>
        </Paper>
    );
};

export default GuestUser;
