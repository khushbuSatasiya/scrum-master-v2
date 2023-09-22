import { createStyles } from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';

import { IPagination } from 'shared/interface';
import { NoRecordPage } from '../componets/noRecordPage';

import '../style/table.scss';

interface ITableProps {
	userList: [];
	columns: DataTableColumn<any>[];
	isLoading: boolean;
	pagination?: IPagination;
	onRowClick?: (record: any) => void;
	handlePagination?: (currentPage?: number, recordPerPage?: number) => void;
	onRecordsPerPageChange?: (recordPerPage?: number) => void;
}

const useStyles = createStyles((theme) => {
	return {
		root: {
			backgroundColor: '#fff'
		},
		header: {
			backgroundColor: theme.colors.blue[5],
			color: theme.white,

			'&& tr': {
				height: '50px',
				backgroundColor: theme.white,
				color: theme.white
			},
			'&& th': {
				fontSize: '16px',
				fontWeight: 'bold',
				color: '#000000',
				borderBottom: '1px dashed'
			}
		},
		footer: {
			'&& div': {
				borderTop: 'unset'
			}
		},
		rowClass: {
			'&& td': {
				borderTop: 'unset',
				borderBottom: '1px dashed #dee2e6',
				fontSize: 15,
				fontWeight: 600,
				color: '#78829D'
			},
			'&& td:hover': {
				textDecoration: 'none !important'
			}
		},
		pagination: {
			button: {
				border: 0,
				outline: 0,
				borderRadius: 7,
				color: '#99A1B7'
			},
			'& button,[!data-active]:hover': {
				color: theme.colors.blue[5]
			}
		}
	};
});

const PAGE_SIZES = [10, 50, 75, 100];

export const TableSelection = (props: ITableProps) => {
	const { isLoading, userList, columns } = props;

	const { classes } = useStyles();

	const getRowClass = (isUpcomingLeave) => {
		console.log('getRowClass ~ isUpcomingLeave:', isUpcomingLeave);
		return isUpcomingLeave.isUpcomingLeave ? 'gray-background' : '';
	};

	return (
		<DataTable
			className='table-wrapper'
			key={Math.random()}
			classNames={classes}
			minHeight={600}
			sx={{ padding: '20px 30px', border: 'none' }}
			columns={columns}
			fetching={isLoading}
			loaderBackgroundBlur={3}
			withBorder
			borderRadius='md'
			highlightOnHover
			records={userList}
			paginationSize='md'
			noRecordsIcon={<NoRecordPage />}
			noRecordsText='No records found'
			totalRecords={props?.pagination?.total}
			recordsPerPage={props?.pagination?.recordPerPage}
			page={props?.pagination?.currentPage}
			recordsPerPageOptions={PAGE_SIZES}
			recordsPerPageLabel={''}
			verticalSpacing='sm'
			rowBorderColor={(theme) => theme.colors.gray[2]}
			onPageChange={(currentPage) => props.handlePagination(currentPage)}
			onRecordsPerPageChange={(recordPerPage) => props.onRecordsPerPageChange(recordPerPage)}
			rowClassName={({ isUpcomingLeave }) => `${classes.rowClass} ${getRowClass({ isUpcomingLeave })}`}
			onRowClick={props.onRowClick || null}
			scrollAreaProps={{ type: 'never' }}
		/>
	);
};
