import React, { FC, useCallback, useEffect, useRef, useState } from "react";

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
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconClock, IconTrash } from "@tabler/icons-react";

import { API_CONFIG } from "shared/constants/api";
import httpService from "shared/services/http.service";

interface IProps {
  projectArray: any;
}

const projects = [
  { label: "matflixx", value: "matflixx" },
  { label: "matflixx", value: "matflixx" },
];

const CheckIn: FC<IProps> = ({ projectArray }) => {
  const ref = useRef<HTMLInputElement>();

  const [projectName, setProjectName] = useState<any>([]);
  // const [isShowForm, setIsShowForm] = useState(false);

  const form = useForm({
    initialValues: {
      time: "",
      employees: [{ task: "", key: randomId(), project: {} }],
    },
    validate: (values) => {
      const errors = {};

      values.employees.forEach((employee, index) => {
        if (employee.task && !employee.project) {
          errors[`employees[${index}].project`] =
            "Project is required when task is filled.";
        }

        if (!employee.task && employee.project) {
          errors[`employees[${index}].task`] =
            "Task is required when project is filled.";
        }
      });

      return errors;
    },
  });

  const getProject = useCallback(() => {
    const projectNames = projectArray.map((data: any) => {
      return {
        label: data.projectName,
        value: data.id,
      };
    });
    setProjectName(projectNames);
  }, [projectArray]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  const handleCheckIn = useCallback(async (values: any) => {
    console.log("values:", values);
    //   try {
    //     await httpService.post(API_CONFIG.path.checkIn, values);
    //   } catch (error) {
    //     console.error(error);
    //   }
  }, []);

  const fields = form.values.employees.map((item, index) => (
    <>
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
              placeholder="Project names"
              searchable
              nothingFound="No options"
              data={projects}
              {...form.getInputProps(`employees.${index}.project`)}
              mb={"20px"}
            />

            <Textarea
              placeholder="Add a task"
              autosize
              minRows={2}
              sx={{ width: "700px" }}
              {...form.getInputProps(`employees.${index}.task`)}
            />
            {form.errors[`employees[${index}].project`] && (
              <div>{form.errors[`employees[${index}].project`]}</div>
            )}
            {form.errors[`employees[${index}].task`] && (
              <div>{form.errors[`employees[${index}].task`]}</div>
            )}
          </Flex>
          {form.values.employees.length !== 1 && (
            <ActionIcon
              color="red"
              onClick={() => {
                form.removeListItem("employees", index);
                // index === 0 &&
                //   index === form.values.employees.length - 1 &&
                //   setIsShowForm(false);
              }}
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          )}
          {index === form.values.employees.length - 1 && (
            /* isShowForm && index === form.values.employees.length - 1 && */
            <Group position="center" mt="md">
              <Button
                variant="outline"
                color="cyan"
                sx={{ width: "105px" }}
                onClick={() => {
                  form.insertListItem("employees", {
                    name: "",
                    key: randomId(),
                  });
                }}
              >
                Add Task
              </Button>
            </Group>
          )}
        </Group>
      </Paper>
    </>
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
            // error={""}
            withAsterisk
          />
          <Space w="lg" />
          {/* {!isShowForm && (
            <Button
              variant="outline"
              color="cyan"
              sx={{ width: "105px" }}
              mt="25px"
              onClick={() => {
                setIsShowForm(!isShowForm);
                form.setValues({
                  time: "",
                  employees: [{ task: "", key: randomId(), project: {} }],
                });
              }}
            >
              Add Task
            </Button>
          )} */}
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
            sx={{ width: "105px", marginTop: "20px" }}
          >
            Submit
          </Button>
        </Group>
      </form>
    </Flex>
  );
};

export default CheckIn;
