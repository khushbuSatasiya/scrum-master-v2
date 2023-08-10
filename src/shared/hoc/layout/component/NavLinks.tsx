import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createStyles, NavLink, Text, ThemeIcon } from '@mantine/core';
import { ROUTES } from '../constants/layoutConstants';

interface ILinkProps {
	icon: React.ReactNode;
	color?: string;
	label: string;
	slug?: string;
	link?: string;
	links?: { label: string; link: string; icon: React.ReactNode | null; color?: string }[];
}

/**
 * custom styling for side navigation bar
 */
const useStyles = createStyles((theme) => {
	return {
		// root: {
		// 	boxShadow: '2px 2px 5px #888888'
		// },
		menu: {
			height: 50,
			borderRadius: '5px',
			fontSize: '18px',
			fontWeight: 600
			// '&:hover': {
			// 	backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.indigo[0]
			// },
			// '&[data-active]': {
			// 	backgroundColor: theme.colors.indigo[1],
			// 	color: theme.colors.blue
			// 	// color: theme.white,
			// },
			// '&[data-active]:hover': {
			// 	backgroundColor: theme.colors.indigo[1],
			// 	color: theme.colors.blue
			// 	// color: theme.white,
			// }
		}
	};
});

const MainLink: React.FC = ({ icon, label, slug, link, links, color }: ILinkProps) => {
	let navigate = useNavigate();
	let location = useLocation();
	const { classes } = useStyles();

	/**
	 * Navigate user to perticular link
	 */
	const goTo = (link: string) => {
		if (link) {
			navigate(link);
		}
	};

	const isSelected = !links && location.pathname !== '/' && location.pathname === link;

	return (
		<NavLink
			className={classes.menu}
			label={<Text color={isSelected ? color : ''}>{label}</Text>}
			icon={
				<ThemeIcon color={color || 'blue'} variant='light'>
					{icon}
				</ThemeIcon>
			}
			onClick={() => goTo(link)}
			active={isSelected}
			defaultOpened={location.pathname.includes(slug)}
		>
			{links &&
				links.length > 0 &&
				links.map((nested) => (
					<NavLink
						className={classes.menu}
						icon={
							<ThemeIcon color={nested.color || 'blue'} variant='light'>
								{nested.icon || null}
							</ThemeIcon>
						}
						key={nested.label}
						label={nested.label}
						onClick={() => goTo(nested.link)}
						active={location.pathname !== '/' && location.pathname === nested.link}
					/>
				))}
		</NavLink>
	);
};

export function NavLinks() {
	const links = ROUTES().map((link) => <MainLink {...link} key={link.label} />);
	return <div>{links}</div>;
}
