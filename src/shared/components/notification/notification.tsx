import { notifications } from '@mantine/notifications';

const showNotification = (res, backgroundColor, borderColor) => {
	notifications.show({
		message: res?.response?.data?.message || res.message,
		styles: (theme) => ({
			root: {
				backgroundColor: backgroundColor,
				borderColor: borderColor,

				'&::before': {
					backgroundColor: theme.white
				}
			},
			position: 'bottom-right',
			title: { color: theme.white },
			description: { color: theme.white },
			closeButton: {
				color: theme.white,
				'&:hover': {
					backgroundColor: theme.colors.blue[7]
				}
			}
		})
	});
};

export { showNotification };
