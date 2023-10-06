import React, { FC } from 'react';
import { Avatar, Box, Divider, Flex, LoadingOverlay, Modal, Text, createStyles } from '@mantine/core';

import { ITeamDetails } from '../interface/dashboard';

interface ITeamInfoProps {
	teamInfo: ITeamDetails[];
	teamLoading: boolean;
	onClose: () => void;
}
const TeamDetails: FC<ITeamInfoProps> = ({ teamInfo, teamLoading, onClose }) => {
	const useStyles = createStyles(() => ({
		body: {
			height: '500px '
		},
		content: {
			overflow: 'hidden',
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
				onClose={onClose}
			>
				<Text ta='center' c={'#071437'} fz={22} fw={600}>
					Our Team
				</Text>

				<Divider variant='dashed' mt={10} mb={0} />

				{teamLoading && (
					<LoadingOverlay
						loaderProps={{
							size: 'xl'
						}}
						visible={teamLoading}
						overlayBlur={2}
					/>
				)}

				{!teamLoading && (
					<Flex
						wrap={'wrap'}
						mt={20}
						sx={{
							height: '400px',
							overflow: 'scroll ',
							'&::-webkit-scrollbar': {
								display: 'none'
							}
						}}
					>
						{teamInfo &&
							teamInfo.map(({ name, avatar, designation }, index) => {
								return (
									<Flex align={'center'} mb={20} w={'50%'} key={index}>
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
					</Flex>
				)}
			</Modal>
		</Box>
	);
};

export default TeamDetails;
