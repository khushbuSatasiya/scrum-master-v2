import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ActionIcon, Group, TextInput } from '@mantine/core';
import { IconEdit, IconEye, IconSearch, IconTrash } from '@tabler/icons-react';
import { useDebouncedState } from '@mantine/hooks';

import { TableSelection } from 'shared/components/table/container/table';
import { API_CONFIG } from 'shared/constants/api';
import { IPagination, State } from 'shared/interface';
import httpService from 'shared/services/http.service';

import EditUser from './editUser';
import { getUserColumns } from '../constants/userConstants';

const User: React.FC = () => {
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(true);
	const [userData, setUserData] = useState<[]>([]);
	const [pagination, setPagination] = useState<IPagination>({
		currentPage: 1,
		nextPage: null,
		recordPerPage: 10,
		remainingCount: 0,
		total: 0,
		totalPages: 1
	});
	const [searchValue, setSearchVal] = useDebouncedState('', 400, { leading: true });
	const selectedOrg = useSelector((state: State) => state?.auth?.selectedOrg);
	const [editPopup, setEditPopup] = useState(false);
	const [editInfo, setEditInfo] = useState();

	/* API call for forgot password */
	const getUserList = (
		currentPage = pagination.currentPage,
		recordPerPage = pagination.recordPerPage,
		searchData = searchValue
	) => {
		const params = {
			currentPage,
			recordPerPage,
			searchData
		};
		setLoading(true);
		httpService
			.get(API_CONFIG.path.user, params)
			.then((res) => {
				const { currentPage, nextPage, recordPerPage, remainingCount, total, totalPages } =
					res.data.item.pagination;
				setUserData(res.data.item.items);
				setPagination({
					currentPage,
					nextPage,
					recordPerPage,
					remainingCount,
					total,
					totalPages
				});
				setLoading(false);
			})
			.catch((err: Error) => {
				console.error('Error', err);
				setLoading(false);
			});
	};

	const handlePagination = (currentPage = pagination.currentPage, recordPerPage = pagination.recordPerPage) => {
		getUserList(currentPage, recordPerPage);
	};

	const onRecordsPerPageChange = (recordPerPage = pagination.recordPerPage) => {
		getUserList(1, recordPerPage);
	};

	const renderActionsColumn = (userInfo: Record<string, any>) => {
		return (
			<Group spacing={4} position='center' noWrap>
				<ActionIcon color='green' onClick={() => navigate(`/user/view/${userInfo.id}`)}>
					<IconEye size={19} />
				</ActionIcon>
				<ActionIcon color='blue' onClick={() => handleEditUser(userInfo)}>
					<IconEdit size={19} />
				</ActionIcon>
				<ActionIcon color='red'>
					<IconTrash size={19} />
				</ActionIcon>
			</Group>
		);
	};

	const handleEditUser = (userInfo) => {
		setEditInfo(userInfo);
		setEditPopup(!editPopup);
	};

	const handleEditPopup = (editPopup) => {
		setEditPopup(editPopup);
	};

	useEffect(() => {
		getUserList(1, 10);
	}, [selectedOrg, searchValue]);

	return (
		<div>
			<TextInput
				placeholder='Search employees...'
				size='md'
				radius='md'
				icon={<IconSearch size={16} />}
				defaultValue={searchValue}
				onChange={(e) => setSearchVal(e.currentTarget.value)}
				sx={{ width: '100%', maxWidth: '300px', margin: '10px 40px' }}
				variant='filled'
			/>
			<TableSelection
				isLoading={isLoading}
				userList={userData}
				pagination={pagination}
				handlePagination={handlePagination}
				onRecordsPerPageChange={onRecordsPerPageChange}
				columns={getUserColumns(renderActionsColumn as Record<string, any>)}
			/>

			{editPopup && (
				<EditUser
					editInfo={editInfo}
					editPopup={editPopup}
					handleEditPopup={handleEditPopup}
					getUserList={getUserList}
				/>
			)}
		</div>
	);
};

export default User;
