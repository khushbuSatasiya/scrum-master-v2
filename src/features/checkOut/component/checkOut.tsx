import React, { FC, useCallback, useEffect, useState } from 'react';

import { useForm, yupResolver } from '@mantine/form';

import {
    checkOutValidationSchema,
    checkOutValidationWithOptSchema,
    checkOutwithNoTaskValidationSchema,
} from 'shared/constants/validation-schema';

import httpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import CheckOutForm from './checkOutForm';

interface IProps {
    enteredTask: any;
    checkOutDate: string;
    checkStatus: () => void;
}

const CheckOut: FC<IProps> = ({ enteredTask, checkOutDate, checkStatus }) => {
    const [projects, setProjects] = useState([]);
    const [isShowForm, setIsShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formatValues = (userTask: any) => {
        if (userTask.length > 0) {
            const tasksArray = userTask.map((task: any) => {
                return {
                    taskId: task.projectId,
                    taskName: task.task,
                    projectHours: '',
                    projectName: task.projectdeatils.projectName,
                };
            });

            return {
                time: '',
                employees: [
                    [
                        {
                            task: '',
                            project: '',
                            projectHours: '',
                        },
                    ],
                ],
                tasks: tasksArray,
            };
        } else {
            return {
                time: '',
                employees: [
                    [
                        {
                            task: '',
                            project: '',
                            projectHours: '',
                        },
                    ],
                ],
                tasks: [
                    // {
                    //   taskId: "",
                    //   projectId: "",
                    //   taskName: "",
                    //   projectHours: "",
                    // },
                ],
            };
        }
    };

    const form = useForm({
        initialValues: formatValues(enteredTask?.findUser[0]?.usertasks),
        validate: yupResolver(
            isShowForm
                ? enteredTask?.findUser[0]?.usertasks.length > 0
                    ? checkOutValidationWithOptSchema
                    : checkOutwithNoTaskValidationSchema
                : enteredTask?.findUser[0]?.usertasks.length > 0
                ? checkOutValidationSchema
                : ''
        ),
    });

    const getProject = useCallback(() => {
        const projectArr = enteredTask.projects.map((item) => {
            return {
                label: item.projectName,
                value: item.id,
            };
        });

        setProjects(projectArr);
    }, [enteredTask.projects]);

    useEffect(() => {
        getProject();
    }, []);

    const handleAddTaskBtn = () => {
        setIsShowForm(!isShowForm);
    };

    const handleCheckOut = useCallback(
        async (values: any) => {
            const updatedTasks = values.tasks.map((item) => {
                return {
                    taskId: '',
                    projectId: item.taskId,
                    taskName: item.taskName,
                    projectHours: item.projectHours,
                };
            });

            const updatedEmployees = values.employees.map((item) => {
                return {
                    taskId: '',
                    projectId: item.project,
                    taskName: item.task,
                    projectHours: item.projectHours,
                };
            });

            const isAnyValueEmpty = () => {
                return values.employees.some((item: any) => {
                    return (
                        item.project === undefined ||
                        item.task === undefined ||
                        item.projectHours === undefined
                    );
                });
            };

            let tasks;

            if (isAnyValueEmpty()) {
                tasks = updatedTasks;
            } else {
                if (enteredTask.findUser[0].usertasks.length > 0) {
                    tasks = [...updatedTasks, ...updatedEmployees];
                } else {
                    tasks = [...updatedEmployees];
                }
            }

            const payload = {
                outTime: values.time,
                date: checkOutDate,
                tasks: tasks,
            };

            try {
                await httpService
                    .post(API_CONFIG.path.checkOut, payload)
                    .then((res: any) => {
                        setIsLoading(false);
                        checkStatus();
                    });
            } catch (error) {
                setIsLoading(false);
                if (error?.response?.status === 409) {
                    checkStatus();
                }
                console.error(error);
            }
        },
        [checkOutDate, checkStatus, enteredTask.findUser]
    );

    return (
        <CheckOutForm
            handleCheckOut={handleCheckOut}
            form={form}
            userTasks={enteredTask.findUser[0].usertasks}
            projects={projects}
            isShowForm={isShowForm}
            setIsShowForm={setIsShowForm}
            handleAddTaskBtn={handleAddTaskBtn}
            checkOutDate={checkOutDate}
            isLoading={isLoading}
        />
    );
};

export default CheckOut;
