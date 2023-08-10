import React, { PropsWithChildren } from 'react';
import { Avatar, Container, createStyles, Divider, Flex, Paper, rem, Text, Title } from '@mantine/core';

import back from 'assets/images/login-back.jpg';
import GoNext from 'assets/images/GoNext.png';
import ST from 'assets/images/ST.png';

import '../styles/login.scss';

const useStyles = createStyles((theme) => ({
	hero: {
		position: 'relative',
		backgroundImage: `url(${back})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh',
		overflowY: 'auto'
	},

	container: {
		height: '100%',
		display: 'flex',
		width: '75%',
		maxWidth: 'unset',
		justifyContent: 'space-between',
		alignItems: 'center',
		zIndex: 1,
		position: 'relative',
		[theme.fn.smallerThan('xl')]: {
			width: '90%'
		},
		[theme.fn.smallerThan('md')]: {
			height: rem(500),
			// paddingBottom: `calc(${theme.spacing.xl} * 3)`,
			flexDirection: 'column',
			paddingTop: 20
		},
		[theme.fn.smallerThan('xs')]: {
			width: '100%'
		}
	},

	title: {
		color: theme.white,
		fontSize: rem(30),
		fontWeight: 600,
		lineHeight: 1.1,
		[theme.fn.smallerThan('sm')]: {
			fontSize: rem(40),
			lineHeight: 1.2
		},

		[theme.fn.smallerThan('xs')]: {
			fontSize: rem(28),
			lineHeight: 1.3
		},
		[theme.fn.smallerThan('md')]: {
			fontSize: rem(18),
			lineHeight: 1.3
		}
	},

	description: {
		color: theme.white,
		maxWidth: 600,

		[theme.fn.smallerThan('sm')]: {
			maxWidth: '100%',
			fontSize: theme.fontSizes.sm,
			textAlign: 'center'
		}
	},
	boxWrapper: {
		width: 550,
		height: 620,
		padding: '60px 65px',

		[theme.fn.smallerThan('md')]: {
			marginTop: '30px'
		},
		[theme.fn.smallerThan('sm')]: {
			padding: '30px 25px',
			width: `calc(100% - 30px)`
		},
		[theme.fn.smallerThan('xs')]: {
			width: '100%'
		}
	}
}));

interface Props extends PropsWithChildren {}

const PublicLayout: React.FC<Props> = (props) => {
	const { classes } = useStyles();

	return (
		<div className={classes.hero} style={{ backgroundImage: `url(${back}) no-repeat`, backgroundSize: 'cover' }}>
			{/* <Overlay
				gradient='linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .20) 40%)'
				opacity={1}
				zIndex={0}
			/> */}
			<Container className={classes.container}>
				<section>
					<Flex justify={{ base: 'center', md: 'flex-start' }} align='center'>
						<Avatar src={ST} size={40} radius='xl' />
						<Title mr={8} className={classes.title}>
							ScaleTech
						</Title>
						<Divider orientation='vertical' />
						<Avatar ml={5} src={GoNext} size={45} radius='xl' />

						<Title className={classes.title}>GoNext</Title>
					</Flex>
					<Text className={classes.description} size='xl' mt='sm'>
						Providing scrum master solutions for your business.
					</Text>
				</section>

				<Paper shadow='sm' radius='lg' className={classes.boxWrapper}>
					{/* <Divider my='sm' label='Login with' labelPosition='center' /> */}
					{props.children}
				</Paper>
			</Container>
		</div>
	);
};

export default PublicLayout;
