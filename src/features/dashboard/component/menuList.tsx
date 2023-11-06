import React, { FC } from 'react';
import { Button, Flex, Menu, ThemeIcon, createStyles } from '@mantine/core';
import { IconDots, IconExternalLink } from '@tabler/icons-react';

interface IMenuProps {
	isShowUserDetails: boolean;
	setIsShowUserDetails: (val: boolean) => void;
	getTeamInfo: () => void;
	getHolidayList: () => void;
}
const MenuList: FC<IMenuProps> = ({ isShowUserDetails, setIsShowUserDetails, getTeamInfo, getHolidayList }) => {
	const useStyles = createStyles(() => ({
		dropdown: {
			left: '-210px !important',
			top: '0px !important'
		},
		item: {
			'&:hover': {
				color: '#228be6 !important',
				background: 'rgba(231, 245, 255, 1) !important'
			}
		}
	}));

	const { classes } = useStyles();

	const menuItems = [
		{
			label: 'My Profile',
			onClick: () => setIsShowUserDetails(!isShowUserDetails),
			link: null
		},
		{
			label: 'Team List',
			onClick: () => getTeamInfo(),
			link: null
		},
		{
			label: 'Holiday List',
			onClick: () => getHolidayList(),
			link: null
		},
		{
			label: 'Leave Policy',
			onClick: null,
			link: 'https://docs.google.com/document/d/1TfUVxotVmZ1Ctj2flcuOwzVNUr-UL99H/edit'
		},
		{
			label: 'Handbook',
			onClick: null,
			link: 'https://drive.google.com/file/d/1rEK3UmEOAmegnf11vKrHzG1RJD5WKHyi/view?usp=share_link'
		},
		{
			label: 'Healthy Workplace',
			onClick: null,
			link: 'https://docs.google.com/document/d/1bDzOoZI8itijukUC_VeAnPKv6rf0dOfKgWJlGFjVRXA/edit'
		}
	];

	return (
		<Flex sx={{ position: 'absolute', top: 30, right: 30 }}>
			<Menu
				shadow='md'
				width={200}
				classNames={{
					dropdown: classes.dropdown,
					item: classes.item
				}}
			>
				<Menu.Target>
					<ThemeIcon size={28} variant='light' radius='sm' sx={{ height: '27px !important' }}>
						<IconDots size={18} style={{ cursor: 'pointer' }} />
					</ThemeIcon>
				</Menu.Target>

				<Menu.Dropdown className='dropdown-menu'>
					{menuItems.map(({ link, onClick, label }, index) => (
						<Menu.Item
							p={'0 15px'}
							onClick={onClick}
							key={index}
							component={link ? 'a' : 'button'}
							target={link ? '_blank' : ''}
							href={link}
						>
							<Button
								variant={'transparent'}
								p={0}
								sx={{
									color: '#252F4A',
									fontSize: '13px',
									fontWeight: 500,
									'&:hover': { color: '#228be6', fontWeight: 600 }
								}}
							>
								{label}
								{link && (
									<span style={{ marginLeft: '3px' }}>
										<IconExternalLink size='18px' />
									</span>
								)}
							</Button>
						</Menu.Item>
					))}
				</Menu.Dropdown>
			</Menu>
		</Flex>
	);
};

export default MenuList;
