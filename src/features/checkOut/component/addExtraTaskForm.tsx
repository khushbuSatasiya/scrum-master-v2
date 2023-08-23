import React, { FC, useEffect, useState } from "react";

import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Select,
  Textarea,
} from "@mantine/core";
import { IconClock, IconPlus, IconTrash } from "@tabler/icons-react";
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
      <Box key={index}>
        {(isShowForm || form.values.tasks.length === 0) && (
          <Paper>
            <Group mt="xs" sx={{ alignItems: "end" }}>
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
                value={""}
              />

              {(isShowForm || form.values.tasks.length === 0) &&
                index === form.values.employees.length - 1 && (
                  <Group position="center">
                    <Button
                      variant="outline"
                      color="cyan"
                      sx={{
                        width: "35px",
                        height: "35px",
                        padding: "0",
                        borderRadius: "50%",
                      }}
                      onClick={() => {
                        form.insertListItem("employees", {
                          task: "",
                          project: form.values.employees[index].project,
                        });
                      }}
                      disabled={
                        isShowForm
                          ? isAddButtonDisabled(form.values.employees[index])
                          : false
                      }
                    >
                      <IconPlus size="1.5rem" stroke={"3px"} />
                    </Button>
                  </Group>
                )}

              <ActionIcon
                color="red"
                onClick={() => {
                  form.removeListItem("employees", index);
                  index === 0 &&
                    index === form.values.employees.length - 1 &&
                    handleAddTaskBtn();
                }}
              >
                <IconTrash size="1.5rem" color="black" />
              </ActionIcon>
            </Group>
            <Divider my="lg" variant="dashed" />
          </Paper>
        )}
      </Box>
    );
  });

  return (
    <div>
      <Box mx="auto">{fields}</Box>
    </div>
  );
};

export default AddExtraTaskForm;
