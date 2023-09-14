import React, { FC, useCallback, useEffect, useState } from 'react';

import { Box, Flex, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import * as actionTypes from 'store/action-types';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { createAction, teamReportIconColor } from 'shared/util/utility';
import { DotIcon } from 'shared/icons/icons';

import { ICalendarInfo, IProUserList } from '../interface/calendar.interface';

import CalendarFilter from './calendarFilter';

import '../style/calendar.scss';

const TeamCalendar: FC = () => {
    const localizer = momentLocalizer(moment);

    const dispatch = useDispatch();

    const [calendarInfo, setCalendarInfo] = useState<ICalendarInfo[]>([]);
    const [proList, setProList] = useState<IProUserList[]>([]);
    const [usersList, setUsersList] = useState<IProUserList[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [uId, setUId] = useState('');
    const [pId, setPId] = useState('');

    const form = useForm({
        initialValues: {
            filteredData: 'All',
            userId: '',
            projectId: '',
        },
    });

    /* API call to get team report */
    const getTeamReport = useCallback(
        (
            projectId?: string,
            month = (new Date().getMonth() + 1).toString(),
            userId?: string
        ) => {
            dispatch(createAction(actionTypes.SET_MONTH, month));

            const params = {
                month,
                projectId,
                userId,
            };

            httpService
                .get(`${API_CONFIG.path.teamReport}`, params)
                .then((res) => {
                    const info = res.data.map((item) => {
                        return {
                            start: moment(item.date, 'YYYY-MM-DD').toDate(),
                            end: moment(item.date, 'YYYY-MM-DD')
                                .add(1, 'hours')
                                .toDate(),
                            id: item.id,
                            title: (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                    {item.type !== 'Holiday' && (
                                        <DotIcon
                                            fill={teamReportIconColor(item)}
                                            height='8px'
                                        />
                                    )}
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: '12px',
                                            marginLeft: 2,
                                            pointerEvents: 'none',
                                        }}>
                                        {item.name}
                                    </p>
                                </div>
                            ),
                            type: item.type,
                        };
                    });
                    setCalendarInfo(info);
                })
                .catch((error) => {
                    month && setIsLoading(false);
                    console.error('Error', error);
                });
        },
        []
    );

    useEffect(() => {
        getTeamReport();
    }, [getTeamReport]);

    /* API call to get project list report */
    const getProjects = useCallback(() => {
        httpService
            .get(`${API_CONFIG.path.projects}`)
            .then((res) => {
                const proList = res.data.map((item) => {
                    return {
                        label: item.projectName,
                        value: item.id,
                    };
                });
                setProList(proList);
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }, []);

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    /* API call to get user list report */
    const getUsers = useCallback(() => {
        httpService
            .get(`${API_CONFIG.path.userList}`)
            .then((res) => {
                const userList = res.data.map((item) => {
                    return {
                        label: item.name,
                        value: item.userId,
                    };
                });
                setUsersList(userList);
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const eventPropGetter = useCallback((event, start, end, isSelected) => {
        const backgroundColor =
            event.type === 'Holiday' ? 'green' : 'transparent';
        const color = event.type === 'Holiday' ? 'white' : 'black';

        return {
            style: {
                backgroundColor,
                color,
            },
        };
    }, []);

    /* For next back of calendar month */
    const handleNavigate = (newDate) => {
        const month = newDate.getMonth() + 1;
        getTeamReport(pId, month, uId);
    };

    return (
        <Paper
            pos={'relative'}
            mt={30}
            shadow='sm'
            radius='lg'
            p='lg'
            display={`${isLoading && 'flex'}`}
            sx={{ justifyContent: `${isLoading && 'center'}` }}>
            {!isLoading && (
                <Box>
                    <Flex
                        wrap={'wrap'}
                        justify={'center'}
                        align={'center'}
                        m={'0 auto'}
                        w={'100%'}>
                        <Calendar
                            popup={true}
                            localizer={localizer}
                            events={calendarInfo}
                            views={['month']}
                            startAccessor='start'
                            endAccessor='end'
                            style={{ height: 650, width: 1210 }}
                            titleAccessor='title'
                            eventPropGetter={eventPropGetter}
                            tooltipAccessor={(event: any) => console.log()}
                            onNavigate={(date, view) => handleNavigate(date)}
                            className='team-calendar'
                            popupOffset={{ x: 0, y: 0 }}
                        />
                    </Flex>

                    <Flex
                        sx={{
                            position: 'absolute',
                            top: 20,
                            left: 20,
                        }}>
                        <CalendarFilter
                            proList={proList}
                            usersList={usersList}
                            getTeamReport={getTeamReport}
                            form={form}
                            setUId={setUId}
                            setPId={setPId}
                        />
                    </Flex>
                </Box>
            )}
        </Paper>
    );
};

export default TeamCalendar;
