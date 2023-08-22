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
  Text,
  Divider,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { IconClock, IconPlus, IconTrash } from "@tabler/icons-react";

import { getProjectList, getTodayDate } from "shared/util/utility";
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
    // employees: Yup.array().of(
    //   Yup.object().shape({
    //     task: Yup.string().test(
    //       "task-required",
    //       "Task is required",
    //       function (value) {
    //         const projectValue = this.parent.project;
    //         if (projectValue === "") {
    //           return true; // Task validation is skipped when project is empty
    //         }
    //         return !!value;
    //       }
    //     ),
    //     project: Yup.string()
    //       .nullable()
    //       .test("project-required", "Project is required", function (value) {
    //         const taskValue = this.parent.task;
    //         if (taskValue === "") {
    //           return true; // Project validation is skipped when task is empty
    //         }

    //         return !!value;
    //       }),
    //   })
    // ),
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
    <Paper key={index}>
      <Group
        mt="xs"
        sx={{ alignItems: "end", justifyContent: "space-between" }}
      >
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
            sx={{
              backgroundColor: "#f5f8fa !important",
              width: "40%",
              border: "none",
            }}
          />

          <Textarea
            autosize
            placeholder={`- task 1\n- task 2`}
            minRows={2}
            sx={{ width: "650px", backgroundColor: "#f5f8fa !important" }}
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

        {index === form.values.employees.length - 1 && (
          <Group position="center" mt="md">
            <Button
              onClick={() => {
                form.insertListItem("employees", {
                  task: "",
                  project: "",
                });
              }}
              disabled={isAddButtonDisabled(form.values.employees[index])}
            >
              <IconPlus size="1.5rem" stroke={"3px"} />
            </Button>
          </Group>
        )}
        {form.values.employees.length !== 1 && (
          <ActionIcon
            color="red"
            onClick={() => {
              form.removeListItem("employees", index);
            }}
          >
            <IconTrash size="1.5rem" />
          </ActionIcon>
        )}
      </Group>

      <Divider my="sm" variant="dashed" />
    </Paper>
  ));

  return (
    <>
      <Flex direction="column" justify="center">
        <form onSubmit={form.onSubmit((values) => handleCheckIn(values))}>
          <Flex justify={"space-between"}>
            <Paper
              shadow="sm"
              radius="lg"
              m={20}
              p="lg"
              sx={{
                width: "70%",
                overflowY: "scroll",
                height: "auto",
                maxHeight: "500px",
                scrollbarWidth: "none",
                "::-webkit-scrollbar": {
                  width: "0.5em",
                  display: "none",
                },
                "::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                },
              }}
            >
              <Flex
                align={"center"}
                justify={"space-between"}
                pb={"10px"}
                pt={"10px"}
              >
                <Text fz="lg" weight={600} color="#5e6278">
                  Task
                </Text>
                <Text ta="center" fz="lg" weight={500} color="#5e6278">
                  {getTodayDate()}
                </Text>

                <Text
                  fz="lg"
                  weight={500}
                  sx={{ marginRight: "15px", visibility: "hidden" }}
                >
                  Check In
                </Text>
              </Flex>
              <Divider my="sm" variant="dotted" />
              {fields.length > 0 ? <Group mb="xs"></Group> : <></>}
              {fields.length > 0 && <Box>{fields}</Box>}
            </Paper>

            <Paper
              shadow="sm"
              radius="lg"
              m={20}
              p="lg"
              sx={{
                width: "25%",
                height: "300px",
              }}
            >
              <Flex align={"center"} justify={"center"} pb={"10px"} pt={"10px"}>
                <Text fz="lg" weight={600} color="#5e6278">
                  Time
                </Text>
              </Flex>

              <Divider my="sm" variant="dashed" />
              <Flex
                direction={"column"}
                align={"center"}
                justify={"space-between"}
                sx={{ height: "180px" }}
              >
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
                <Group position="center">
                  <Button
                    type="submit"
                    sx={{ width: "140px", marginTop: "20px" }}
                    loading={isLoading}
                    disabled={isLoading}
                    loaderPosition="left"
                    loaderProps={{
                      size: "sm",
                      color: "#15aabf",
                      variant: "oval",
                    }}
                  >
                    Check In
                  </Button>
                </Group>
              </Flex>
            </Paper>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default CheckIn;
