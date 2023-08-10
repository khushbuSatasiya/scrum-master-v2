import { Box } from '@mantine/core';
import { IconMoodSadDizzy } from '@tabler/icons-react';

export const NoRecordPage: React.FC = () => (
	<Box
		p={4}
		mb={4}
		sx={(theme) => ({
			fontSize: 0,
			color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
			border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]}`,
			borderRadius: theme.radius.md,
			background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
		})}
	>
		<IconMoodSadDizzy size={36} strokeWidth={1.5} />
	</Box>
);
