import { Avatar, Box, Flex, Modal, Text, createStyles } from '@mantine/core';
import React, { FC } from 'react';

interface ITeamDetails {
	teamInfo: any;
}
const TeamDetails: FC<ITeamDetails> = ({ teamInfo }) => {
	const useStyles = createStyles(() => ({
		body: {
			height: '500px '
		},
		content: {
			overflow: 'auto',
			'::-webkit-scrollbar': {
				display: 'none'
			}
		}
	}));

	const { classes } = useStyles();
	return (
		<Box>
			<Modal
				shadow='sm'
				size={'550px'}
				pos={'relative'}
				centered
				padding={20}
				radius='lg'
				withCloseButton={false}
				opened={true}
				classNames={{ body: classes.body, content: classes.content }}
				onClose={() => {
					//setTeamInfo([]);
				}}
			>
				<Text ta='center' c={'#071437'} fz={26} fw={600}>
					Your Great Team
				</Text>

				{teamInfo &&
					teamInfo.map(({ name, avatar, designation }) => {
						return (
							<Flex align={'center'} mb={20}>
								<Avatar src={avatar} alt={name} radius='md' />
								<Box ml={10}>
									<Text c={'#071437'} fz={14} fw={500}>
										{name}
									</Text>
									<Text c={'#B5B5C3'} fz={12} fw={500}>
										{designation ? designation : 'Team Member'}
									</Text>
								</Box>
							</Flex>
						);
					})}
			</Modal>
		</Box>
	);
};

export default TeamDetails;
