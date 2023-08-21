import React, { FC, useEffect, useState } from "react";

import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Select,
  Textarea,
} from "@mantine/core";
import { IconClock, IconTrash } from "@tabler/icons-react";
import { TimeInput } from "@mantine/dates";

interface IProps {
  form: any;
  isShowForm: boolean;
  setIsShowForm: (action: boolean) => void;
  handleAddTaskBtn: () => void;
  projects: any;
}

const AddExtraTaskForm: FC<IProps> = ({
  form,
  isShowForm,
  handleAddTaskBtn,
  projects,
}) => {
  const [hourInputRefs, setHourInputRefs] = useState<
    Array<React.RefObject<any>>
  >([]);

  useEffect(() => {
    setHourInputRefs(
      Array.from({ length: form.values.employees.length }).map(() =>
        React.createRef()
      )
    );
  }, [form.values.employees.length]);

  const isAddButtonDisabled = (employee: any) => {
    return (
      employee.task.trim() === "" ||
      employee.project === "" ||
      employee.projectHours === "" ||
      (employee.task.trim() === "" &&
        employee.project === "" &&
        employee.projectHours === "")
    );
  };

  const fields = form.values.employees.map((item, index) => {
    return (
      isShowForm && (
        <Paper
          p="md"
          mt={"10px"}
          withBorder={true}
          sx={{ width: "850px", margin: "0 auto" }}
          key={index}
        >
          <Group mt="xs" sx={{ display: "flex", justifyContent: "start" }}>
            <Flex direction={"column"} justify={"start"}>
              <Flex justify={"start"}>
                <Select
                  clearable
                  searchable
                  label="Project name"
                  placeholder="Project names"
                  nothingFound="No options"
                  dropdownPosition="bottom"
                  data={projects}
                  {...form.getInputProps(`employees.${index}.project`)}
                  mb={"20px"}
                />
                <TimeInput
                  label="Enter project spend hours"
                  ref={hourInputRefs[index]}
                  rightSection={
                    <ActionIcon
                      onClick={() => hourInputRefs[index].current.showPicker()}
                    >
                      <IconClock size="1rem" stroke={1.5} />
                    </ActionIcon>
                  }
                  {...form.getInputProps(`employees.${index}.projectHours`)}
                  maw={180}
                  withAsterisk
                  sx={{ marginLeft: "20px" }}
                />
              </Flex>
              <Textarea
                placeholder={`- task 1\n- task 2`}
                autosize
                minRows={2}
                sx={{ width: "650px" }}
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

            <ActionIcon
              color="red"
              onClick={() => {
                form.removeListItem("employees", index);
                index === 0 &&
                  index === form.values.employees.length - 1 &&
                  handleAddTaskBtn();
              }}
            >
              <IconTrash size="1rem" />
            </ActionIcon>

            {isShowForm && index === form.values.employees.length - 1 && (
              <Group position="center" mt="md">
                <Button
                  variant="outline"
                  color="cyan"
                  sx={{ width: "105px" }}
                  onClick={() => {
                    form.insertListItem("employees", {
                      task: "",
                      project: form.values.employees[index].project,
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
      )
    );
  });

  return (
    <div>
      <Box mx="auto">{fields}</Box>
    </div>
  );
};

export default AddExtraTaskForm;
