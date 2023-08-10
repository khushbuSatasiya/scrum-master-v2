import React from 'react';
import { useMantineColorScheme, Box, Flex, Text, rem } from '@mantine/core';
import logoImg from 'assets/images/logo.png';
import '../styles/layout.scss';

export function Brand() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<Box
			sx={(theme) => ({
				paddingLeft: theme.spacing.xs,
				paddingRight: theme.spacing.xs,
				paddingBottom: theme.spacing.lg,
				borderBottom: `${rem(1)} solid ${
					theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
				}`
			})}
		>
			<Flex justify='flex-start' align='center'>
				<div className='img-wrapper'>
					<img src={logoImg} alt='logo' className='image' />
				</div>

				<Text ta='center' fw={700} variant='gradient' fz={'md'} tt='uppercase'>
					Scaletech
				</Text>
			</Flex>
			{/*<Logo colorScheme={colorScheme} />*/}
			{/* <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                    {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
                </ActionIcon> */}
			{/*</Group>*/}
		</Box>
	);
}
