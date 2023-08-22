import React, { FC, useCallback, useEffect, useState } from 'react';

import moment from 'moment';

import { MonthPickerInput } from '@mantine/dates';
import { IconCalendar, IconDownload } from '@tabler/icons-react';
import { Box, Button, Flex, Space, ThemeIcon, Tooltip } from '@mantine/core';
import fileSever from 'file-saver';

import { TableSelection } from 'shared/components/table/container/table';
import { API_CONFIG } from 'shared/constants/api';
import httpService from 'shared/services/http.service';

import { getUserTimesheetColumns } from '../constant/constant';
import TimesheetTaskModal from './timesheetTaskModal';

interface IUserTimeSheetProps {
    handleTimeSheetDetails?: (workingHours) => void;
    uId: string;
}
const TimeSheet: FC<IUserTimeSheetProps> = ({
    handleTimeSheetDetails,
    uId,
}) => {
    const [isLoading, setLoading] = useState(false);
    const [value, setValue] = useState<Date | null>(new Date());
    const [timeSheetData, setTimeSheetData] = useState<[]>([]);
    const [task, setTask] = useState(
        {} as { plannedTasks: string; completedTasks: string }
    );

    /* API call for get user timesheet data */

    const getUerTimeSheet = useCallback(
        (date?: any) => {
            const params = {
                startDate: date
                    ? moment(date).startOf('month').format('YYYY-DD-MM')
                    : '',
                endDate: date
                    ? moment(date).endOf('month').format('YYYY-DD-MM')
                    : '',
            };
            setLoading(true);
            httpService
                .get(`${API_CONFIG.path.getTimeSheet}/${uId}`, params)
                .then((res) => {
                    const workingHour = res.data.workingHours;
                    setTimeSheetData(res.data.items);
                    handleTimeSheetDetails(workingHour);

                    setLoading(false);
                })
                .catch((err: Error) => {
                    console.error('Error', err);
                    setLoading(false);
                });
        },
        [uId]
    );

    //  API call for get user timesheet Excel
    const getTimeSheetExcel = useCallback(() => {
        const params = {
            startDate: value
                ? moment(value).startOf('month').format('YYYY-DD-MM')
                : '',
            endDate: value
                ? moment(value).endOf('month').format('YYYY-DD-MM')
                : '',
        };

        httpService
            .get(`${API_CONFIG.path.timeSheetExcel}/${uId}`, params, {
                responseType: 'blob',
            })

            .then((res) => {
                const blob = new Blob([res], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });

                fileSever.saveAs(blob, 'timesheet.xlsx');
            })
            .catch((err: Error) => {
                console.error('Error', err);
            });
    }, [value]);

    const renderModal = (timesheetData) => {
        return (
            <Box>
                <Button
                    color='blue'
                    variant='outline'
                    radius='md'
                    onClick={() => {
                        setTask({
                            plannedTasks: timesheetData.plannedTasks,
                            completedTasks: timesheetData.completedTasks,
                        });
                    }}>
                    Tasks
                </Button>
            </Box>
        );
    };

    const onClose = useCallback(
        () => setTask({} as { plannedTasks: string; completedTasks: string }),
        []
    );

    useEffect(() => {
        getUerTimeSheet();
    }, []);

    return (
        <Box>
            <Flex justify='space-between'>
                <MonthPickerInput
                    value={value}
                    size='sm'
                    monthsListFormat='MMM'
                    onChange={(date) => {
                        getUerTimeSheet(date);
                        setValue(date);
                    }}
                    maw={200}
                    variant='filled'
                    clearable
                    placeholder='Pick a month'
                    radius='md'
                    mb={30}
                    icon={<IconCalendar size={16} />}
                />
                <Space w='20px' />
                <Tooltip
                    label='Download Excel'
                    color='blue'
                    position='bottom'
                    withArrow>
                    <ThemeIcon
                        w={40}
                        h={40}
                        onClick={getTimeSheetExcel}
                        variant='light'
                        mb={30}
                        radius='md'>
                        <IconDownload cursor='pointer' />
                    </ThemeIcon>
                </Tooltip>
            </Flex>

            <TableSelection
                isLoading={isLoading}
                userList={timeSheetData}
                columns={getUserTimesheetColumns(renderModal)}
            />

            <TimesheetTaskModal task={task} onClose={onClose} />
        </Box>
    );
};

export default TimeSheet;
