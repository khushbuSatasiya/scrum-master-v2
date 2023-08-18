import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import * as Yup from "yup";

import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Select,
  Space,
  Textarea,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { IconClock, IconTrash } from "@tabler/icons-react";

import { getProjectList } from "shared/util/utility";
import { API_CONFIG } from "shared/constants/api";
import httpService from "shared/services/http.service";

interface IProps {
  projectArray: any;
  checkStatus: () => void;
}

const CheckIn: FC<IProps> = ({ projectArray, checkStatus }) => {
  const ref = useRef<HTMLInputElement>();

  const [projectName, setProjectName] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    time: Yup.string().required("Time is required"),
    employees: Yup.array().of(
      Yup.object().shape({
        task: Yup.string().test(
          "task-required",
          "Task is required",
          function (value) {
            const projectValue = this.parent.project;
            if (projectValue === "") {
              return true; // Task validation is skipped when project is empty
            }
            return !!value;
          }
        ),
        project: Yup.string()
          .nullable()
          .test("project-required", "Project is required", function (value) {
            const taskValue = this.parent.task;
            if (taskValue === "") {
              return true; // Project validation is skipped when task is empty
            }

            return !!value;
          }),
      })
    ),
  });

  const form = useForm({
    initialValues: {
      time: "",
      employees: [
        {
          task: "",
          project: "",
        },
      ],
    },
    validate: yupResolver(validationSchema),
  });

  const getProject = useCallback(() => {
    setProjectName(getProjectList(projectArray));
  }, [projectArray]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  const handleCheckIn = useCallback(async (values: any) => {
    const updatedValue = values.employees.map((data: any, index: number) => {
      return {
        projectId: data.project,
        taskName: data.task,
      };
    });

    const payload = {
      inTime: values.time,
      tasks: updatedValue,
    };

    setIsLoading(true);

    try {
      await httpService
        .post(API_CONFIG.path.checkIn, payload)
        .then((res: any) => {
          setIsLoading(false);
          checkStatus();
        });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, []);

  const isAddButtonDisabled = (employee: any) => {
    return (
      employee.task.trim() === "" ||
      employee.project === "" ||
      (employee.task.trim() === "" && employee.project === "")
    );
  };

  const fields = form.values.employees.map((item, index) => (
    <Paper
      p="md"
      mt={"10px"}
      withBorder={true}
      sx={{ width: "900px", margin: "0 auto" }}
      key={index}
    >
      <Group mt="xs">
        <Flex direction={"column"}>
          <Select
            clearable
            searchable
            placeholder="Project names"
            nothingFound="No options"
            dropdownPosition="bottom"
            data={projectName}
            {...form.getInputProps(`employees.${index}.project`)}
            mb={"20px"}
          />

          <Textarea
            placeholder={`- task 1\n- task 2`}
            autosize
            minRows={2}
            sx={{ width: "700px" }}
            {...form.getInputProps(`employees.${index}.task`)}
            onKeyDown={(event) => {
              if (
                event.key === " " &&
                event.currentTarget.selectionStart === 0
              ) {
                event.preventDefault();
              }
            }}
          />
        </Flex>
        {form.values.employees.length !== 1 && (
          <ActionIcon
            color="red"
            onClick={() => {
              form.removeListItem("employees", index);
            }}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        )}
        {index === form.values.employees.length - 1 && (
          <Group position="center" mt="md">
            <Button
              variant="outline"
              color="cyan"
              sx={{ width: "105px" }}
              onClick={() => {
                form.insertListItem("employees", {
                  task: "",
                  project: "",
                });
              }}
              disabled={isAddButtonDisabled(form.values.employees[index])}
            >
              Add Task
            </Button>
          </Group>
        )}
      </Group>
    </Paper>
  ));

  return (
    <Flex direction="column" justify="center">
      <form onSubmit={form.onSubmit((values) => handleCheckIn(values))}>
        <Flex align="center" justify={"center"}>
          <TimeInput
            label="Time (24 hour)"
            ref={ref}
            rightSection={
              <ActionIcon onClick={() => ref.current.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            {...form.getInputProps("time")}
            maw={105}
            withAsterisk
          />
          <Space w="lg" />
        </Flex>

        <Box mx="auto">
          {fields.length > 0 ? <Group mb="xs"></Group> : <></>}
          {fields.length > 0 && <Box>{fields}</Box>}
        </Box>

        <Group position="center">
          <Button
            type="submit"
            variant="outline"
            color="cyan"
            sx={{ width: "140px", marginTop: "20px" }}
            loading={isLoading}
            disabled={isLoading}
            loaderPosition="left"
            loaderProps={{ size: "sm", color: "#15aabf", variant: "oval" }}
          >
            Check In
          </Button>
        </Group>
      </form>
    </Flex>
  );
};

export default CheckIn;
