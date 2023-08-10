import { IconBeach, IconCalendarX } from '@tabler/icons-react';
import { IconDashboard, IconUsers, IconCalendarTime } from '@tabler/icons-react';

/**
 * Side navigation bar routes
 * Default mantine colors: 'dark' | 'gray' | 'red' | 'pink' | 'grape' | 'violet' | 'indigo' | 'blue' | 'cyan' | 'green' | 'lime' | 'yellow' | 'orange' | 'teal'
 */
export const ROUTES = () => [
	{
		icon: <IconDashboard size='1.1rem' />,
		label: 'Dashboard',
		link: '/dashboard',
		color: 'blue'
	},
	{
		icon: <IconUsers size='1.1rem' />,
		label: 'Users',
		color: 'teal',
		link: '/user/list'
	},
	{
		icon: <IconCalendarTime size='1.1rem' />,
		label: 'Time Sheet',
		color: 'indigo',
		link: '/timesheet/list'
	},
	{
		icon: <IconCalendarX size='1.1rem' />,
		label: 'Leave List',
		color: 'orange',
		link: '/leave/list'
	},
	{
		icon: <IconBeach size='1.1rem' />,
		label: 'Holiday List',
		color: 'cyan',
		link: '/holiday/list'
	}
	// {
	// 	icon: <IconUser size='1.1rem' />,
	// 	label: 'User',
	// 	slug: 'user',
	// 	color: 'teal',
	// 	links: [
	// 		{
	// 			label: 'List',
	// 			link: '/user/list',
	// 			color: 'violet',
	// 			icon: <IconUsers size='1.1rem' />
	// 		}
	// 	]
	// }
];

//export const ROUTES = () => [
//    { icon: '📈', label: 'Dashboard', link: '/dashboard' },
//    {
//        icon: '👤',
//        label: 'User',
//        slug: 'user',
//        links: [{ label: 'List', link: '/user/list', icon: '👥' }],
//    },
//];
