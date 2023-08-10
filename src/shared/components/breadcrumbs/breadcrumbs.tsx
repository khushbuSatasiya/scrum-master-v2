import { Breadcrumbs, Anchor, Paper, Text } from '@mantine/core';

const items = [
	{ title: 'Dashboard', href: '/' },
	{ title: 'User list', href: 'user/list' }
].map((item, index) => (
	<Anchor href={item.href} key={index}>
		{item.title}
	</Anchor>
));

export const Breadcrumb: React.FC = () => {
	return (
		<Paper shadow='xs' p='md' mt='xs' mb='xl' ml={40} mr={40}>
			<Text fw={700} fz='xl' mb={7}>
				User list
			</Text>
			<Breadcrumbs>{items}</Breadcrumbs>
		</Paper>
	);
};
