import React, { FC, useCallback, useEffect, useState } from 'react';

import fileSever from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Select, ThemeIcon, Tooltip } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

import { TableSelection } from 'shared/components/table/container/table';
import { API_CONFIG } from 'shared/constants/api';
import { IPagination } from 'shared/interface';
import httpService from 'shared/services/http.service';
import authService from 'shared/services/auth.service';

import { STATUS_DATA, getLeaveColumns } from '../constant/wfhConstant';
import { IWfh } from '../interface/wfh';

interface IWfhProps {
	uId: string;
}

const Wfh: FC<IWfhProps> = ({ uId }) => {
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState<string>('');

	const [wfhList, setWfhList] = useState<IWfh[]>([]);
	const [pagination, setPagination] = useState<IPagination>({
		currentPage: 1,
		nextPage: null,
		recordPerPage: 10,
		remainingCount: 0,
		total: 0,
		totalPages: 1
	});

	/* API call for get wfh list data */
	const getWfhList = useCallback(
		(currentPage = pagination.currentPage, recordPerPage = pagination.recordPerPage, status?: string) => {
			const params = {
				currentPage,
				recordPerPage,
				status: status ?? selectedStatus
			};
			setLoading(true);
			httpService
				.get(API_CONFIG.path.wfhList, params)
				.then((res) => {
					setWfhList(res.data.items);
					const { currentPage, recordPerPage, total } = res.data.pagination;
					setPagination({
						currentPage,
						recordPerPage,
						total
					});
					setLoading(false);
				})
				.catch((error) => {
					if (error.response.status === 401) {
						authService.removeAuthData();
						navigate('/token-expired');
					}
					console.error('Error', error);
					setLoading(false);
				});
		},
		[pagination]
	);

	/* API call for get  wfh Excel */
	const getLeaveExcel = useCallback(() => {
		httpService
			.get(API_CONFIG.path.wfhExcel, '', {
				responseType: 'blob'
			})

			.then((res) => {
				const blob = new Blob([res], {
					type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
				});

				fileSever.saveAs(blob, 'wfh.xlsx');
			})
			.catch((err: Error) => {
				console.error('Error', err);
			});
	}, []);

	const handlePagination = useCallback(
		(currentPage = pagination.currentPage, recordPerPage = pagination.recordPerPage) => {
			getWfhList(currentPage, recordPerPage);
		},
		[pagination, getWfhList]
	);

	const onRecordsPerPageChange = useCallback(
		(recordPerPage = pagination.recordPerPage) => {
			getWfhList(1, recordPerPage);
		},
		[pagination, getWfhList]
	);

	useEffect(() => {
		getWfhList(1, 10);
	}, []);

	return (
		<Box mt={30}>
			<Flex direction='column'>
				<Flex align='start' justify='space-between'>
					<Select
						size='sm'
						radius='md'
						data={STATUS_DATA}
						defaultValue={STATUS_DATA[0].value}
						placeholder='Select Status'
						mb={15}
						sx={{ width: '200px', border: 'red' }}
						nothingFound='Nobody here'
						onChange={(e: string) => {
							setSelectedStatus(e || '');
							getWfhList(1, 10, e || '');
						}}
						height={80}
					/>

					<Tooltip label='Download Excel' color='blue' position='bottom' withArrow>
						<ThemeIcon w={40} h={40} onClick={getLeaveExcel} mb={15} radius='md'>
							<IconDownload cursor='pointer' />
						</ThemeIcon>
					</Tooltip>
				</Flex>
				<TableSelection
					isLoading={isLoading}
					userList={wfhList}
					pagination={pagination}
					handlePagination={handlePagination}
					onRecordsPerPageChange={onRecordsPerPageChange}
					columns={getLeaveColumns()}
					leave
					isUpcomingWfh
				/>
			</Flex>
		</Box>
	);
};

export default Wfh;
