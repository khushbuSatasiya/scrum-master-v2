import React, { FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Box, Tabs } from '@mantine/core';

import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import authService from 'shared/services/auth.service';

import TimeSheet from 'features/timeSheet/component/timeSheet';
import Leave from 'features/leave/component/leave';
import LeaveOrMissingDay from 'features/leaveOrMissingDay/component/leaveOrMissingDay';
import CheckOut from 'features/checkOut/component/checkOut';
import Project from 'features/project/components/project';
import CheckIn from 'features/checkIn/component/checkIn';
import NoActionRequired from 'features/noActionRequired/noActionRequired';

import { IProjectArray, IUserDetail } from '../interface/dashboard';

import UserInfoTab from './userInfoTab';
import UserDetail from './userDetail';

const Dashboard: FC = () => {
    const { token } = useParams<{ token: string }>();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [actionType, setActionType] = useState('');
    const [activeTab, setActiveTab] = useState<string | null>('check-in');
    const [projectArray, setProjectArray] = useState<IProjectArray[]>([]);
    const [newToken, setNewToken] = useState<IUserDetail>({} as IUserDetail);
    const [totalWorkingHour, setTotalWorkingHour] = useState('');
    const [leaveDetails, setLeaveDetails] = useState<Record<string, any>>({});
    const [enteredTask, setEnteredTask] = useState<any>({});
    const [checkOutDate, setCheckOutDate] = useState('');
    const [isActionLoader, setIsActionLoader] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [actionTime, setActionTime] = useState({
        inTime: '',
        outTime: '',
    });
    const [tasks, setTasks] = useState([]);
    const [date, setDate] = useState();
    const [totalHours, setTotalHours] = useState('');

    const checkStatus = useCallback(async () => {
        setIsActionLoader(true);
        try {
            await httpService.get(API_CONFIG.path.status).then((res) => {
                setActionType(res.data.action);
                setIsActionLoader(false);

                if (res.data.action === 'noActionRequired') {
                    const { inTime, outTime } = res.data.timeSheet;
                    setActionTime({
                        inTime: inTime,
                        outTime: outTime,
                    });
                    setTasks(res.data.tasks);
                    setDate(res.data.date);
                    setTotalHours(res.data.totalHours);
                }

                if (
                    res.data.action === 'checkOut' ||
                    res.data.action === 'checkIn'
                ) {
                    setCurrentTime(res.data.currentTime);
                    res.data.date && setCheckOutDate(res.data.date);
                    setProjectArray(res.data.projects);
                }

                res.data.action === 'checkOut' &&
                    res.data?.tasks &&
                    setEnteredTask(res.data.tasks);
            });
        } catch (error) {
            setIsActionLoader(false);
            console.error(error);
        }
    }, []);

    const login = useCallback(
        async (token: string) => {
            try {
                await httpService
                    .post(API_CONFIG.path.login, {
                        email: '',
                        password: '',
                        token: token,
                    })
                    .then((res) => {
                        navigate('/');
                        authService.setAuthData(res);
                        checkStatus();
                    });
            } catch (error) {
                console.error(error);
                if (error.response.status === 401) {
                    authService.removeAuthData();
                    navigate('/token-expired');
                }
            }
        },
        [navigate]
    );
    useEffect(() => {
        if (authService.getAuthData() && !pathname.includes('verify-token')) {
            const tempToken = authService.getAuthData();
            setNewToken(tempToken);
            navigate('/');
        } else {
            setNewToken(token as any);
            login(token);
        }
    }, [login, token]);

    useEffect(() => {
        !actionType && authService.getAuthData() && checkStatus();
    }, [actionType, checkStatus]);

    const handleTimeSheetDetails = (workingHours) => {
        setTotalWorkingHour(workingHours);
    };

    const handleLeaveDetails = (leaveInfo) => {
        const {
            grantedLeaves,
            usedLeaves,
            remainingLeaves,
            vacationLeaves,
            compensationLeaves,
        } = leaveInfo;
        setLeaveDetails({
            grantedLeaves,
            usedLeaves,
            remainingLeaves,
            vacationLeaves,
            compensationLeaves,
        });
    };

    const USER_INFO_ARR = [
        {
            label: 'Check In/Out',
            value: 'check-in',
            content: (
                <>
                    {actionType === 'checkIn' && (
                        <CheckIn
                            projectArray={projectArray}
                            checkStatus={checkStatus}
                            currentTime={currentTime}
                        />
                    )}
                    {actionType === 'checkOut' && (
                        <CheckOut
                            enteredTask={enteredTask}
                            checkOutDate={checkOutDate}
                            checkStatus={checkStatus}
                            projectArray={projectArray}
                            currentTime={currentTime}
                        />
                    )}
                    {actionType === 'LeaveApplyOrMissingDay' && (
                        <LeaveOrMissingDay checkOutDate={checkOutDate} />
                    )}
                    {actionType === 'noActionRequired' && (
                        <NoActionRequired
                            actionTime={actionTime}
                            date={date}
                            tasks={tasks}
                            totalHours={totalHours}
                        />
                    )}
                </>
            ),
        },
        {
            label: 'Time Sheet',
            value: 'timesheet',
            content: (
                <TimeSheet
                    uId={newToken && newToken.userId}
                    handleTimeSheetDetails={handleTimeSheetDetails}
                />
            ),
        },
        {
            label: 'Leave Report',
            value: 'leavereport',
            content: (
                <Leave
                    handleLeaveDetails={handleLeaveDetails}
                    uId={newToken && newToken.userId}
                />
            ),
        },
        {
            label: 'Projects',
            value: 'projects',
            content: <Project uId={newToken && newToken.userId} />,
        },
    ];

    return (
        <div>
            <Box
                sx={{
                    width: '1250px',
                    margin: '0 auto',
                }}>
                <Tabs
                    defaultValue='check-in'
                    onTabChange={(data) => {
                        data !== 'leavereport' && setLeaveDetails({});
                        data !== 'timesheet' && setTotalWorkingHour('');
                        setActiveTab(data);
                    }}>
                    <UserDetail
                        activeTab={activeTab}
                        USER_INFO_ARR={USER_INFO_ARR}
                        newToken={newToken}
                        totalWorkingHour={totalWorkingHour}
                        leaveDetails={leaveDetails}
                    />

                    <UserInfoTab
                        activeTab={activeTab}
                        USER_INFO_ARR={USER_INFO_ARR}
                        isActionLoader={isActionLoader}
                        actionType={actionType}
                    />
                </Tabs>
            </Box>
        </div>
    );
};

export default Dashboard;
