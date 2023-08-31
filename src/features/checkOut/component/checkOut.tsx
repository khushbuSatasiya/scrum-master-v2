import React, { FC, useCallback, useEffect, useState } from "react";

import { useForm, yupResolver } from "@mantine/form";

import { Button, Flex, Modal, Paper, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

import {
  checkOutValidationSchema,
  checkOutValidationWithOptSchema,
  checkOutwithNoTaskValidationSchema,
} from "shared/constants/validation-schema";
import httpService from "shared/services/http.service";
import Notification from "shared/components/notification/notification";
import { API_CONFIG } from "shared/constants/api";

import CheckOutForm from "./checkOutForm";
import { getProjectList } from "shared/util/utility";

interface IProps {
  enteredTask: any;
  checkOutDate: string;
  checkStatus: () => void;
  projectArray: any;
  currentTime: string;
}

const CheckOut: FC<IProps> = ({
  enteredTask,
  checkOutDate,
  checkStatus,
  projectArray,
  currentTime,
}) => {
  const [projects, setProjects] = useState([]);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlreadyCheckOut, setIsAlreadyCheckOut] = useState(false);

  const formatValues = (userTask: any) => {
    if (userTask.length > 0) {
      const tasksArray = userTask.map((task: any) => {
        return {
          taskId: task.projectId,
          taskName: task.taskCreate,
          projectHours: "",
          projectName: task.projectDetails.projectName,
          id: task.id,
        };
      });

      return {
        time: currentTime,
        employees: [
          [
            {
              task: "",
              project: "",
              projectHours: "",
            },
          ],
        ],
        tasks: tasksArray,
      };
    } else {
      return {
        time: currentTime,
        employees: [
          [
            {
              task: "",
              project: "",
              projectHours: "",
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

  const selectedValidationSchema = () => {
    if (isShowForm || enteredTask.length === 0) {
      if (enteredTask.length > 0) {
        return checkOutValidationWithOptSchema;
      } else {
        return checkOutwithNoTaskValidationSchema;
      }
    } else {
      if (enteredTask.length > 0) {
        return checkOutValidationSchema;
      }
    }
  };

  const validationSchema = selectedValidationSchema();

  const form = useForm({
    initialValues: formatValues(enteredTask),
    validate: yupResolver(validationSchema),
  });

  const getProject = useCallback(() => {
    setProjects(getProjectList(projectArray));
  }, [projectArray]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  const handleAddTaskBtn = () => {
    setIsShowForm(!isShowForm);
  };

  const handleCheckOut = useCallback(
    async (values: any) => {
      const updatedTasks = values.tasks.map((item) => {
        return {
          taskId: item.id,
          projectId: item.taskId,
          taskName: item.taskName,
          projectHours: item.projectHours,
        };
      });

      const updatedEmployees = values.employees.map((item) => {
        return {
          taskId: "",
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
        if (enteredTask.length > 0) {
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
            Notification(res);
            checkStatus();
          });
      } catch (error) {
        setIsLoading(false);
        if (error?.response?.status === 409) {
          setIsAlreadyCheckOut(true);
        }
        console.error(error);
      }
    },
    [checkOutDate, checkStatus, enteredTask.length]
  );

  return (
    <>
      <CheckOutForm
        handleCheckOut={handleCheckOut}
        form={form}
        userTasks={enteredTask}
        projects={projects}
        isShowForm={isShowForm}
        setIsShowForm={setIsShowForm}
        handleAddTaskBtn={handleAddTaskBtn}
        checkOutDate={checkOutDate}
        isLoading={isLoading}
      />

      <Modal
        size="auto"
        opened={isAlreadyCheckOut}
        onClose={() => setIsAlreadyCheckOut(false)}
        centered
        padding={40}
        radius="lg"
        withCloseButton={false}
      >
        <Paper radius="lg">
          <Flex align={"center"} direction={"column"}>
            <Flex justify="center" align="center" direction="column" mb={20}>
              <IconAlertTriangle size="120" color="Orange" />
            </Flex>
            <Text ta="center" mb={30} weight={600} color="#99A1B7">
              You already check out
            </Text>

            <Button
              variant="outline"
              color="red"
              onClick={() => {
                checkStatus();
                setIsAlreadyCheckOut(false);
              }}
            >
              OK
            </Button>
          </Flex>
        </Paper>
      </Modal>
    </>
  );
};

export default CheckOut;
