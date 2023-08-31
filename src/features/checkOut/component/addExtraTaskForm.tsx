import React, { FC } from "react";

import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";

interface IProps {
  form: any;
  isShowForm: boolean;
  setIsShowForm: (action: boolean) => void;
  handleAddTaskBtn: () => void;
  projects: any;
  classes: any;
}

const AddExtraTaskForm: FC<IProps> = (props: IProps) => {
  const { form, isShowForm, handleAddTaskBtn, projects, classes } = props;

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
          <Flex direction={"column-reverse"}>
            <Paper>
              <Group mt="xs" sx={{ alignItems: "end" }}>
                <Flex justify={"start"}>
                  <Select
                    clearable
                    searchable
                    placeholder="Project names"
                    nothingFound="No options"
                    dropdownPosition="bottom"
                    classNames={{
                      input: classes.input,
                    }}
                    data={projects}
                    {...form.getInputProps(`employees.${index}.project`)}
                  />

                  <TextInput
                    withAsterisk
                    placeholder="00:00"
                    maxLength={5}
                    maw={270}
                    sx={{ marginLeft: "20px" }}
                    classNames={{
                      input: classes.input,
                    }}
                    // value={form.values.time}
                    {...form.getInputProps(`employees.${index}.projectHours`)}
                  />
                </Flex>
                <Textarea
                  placeholder={`- task 1\n- task 2`}
                  autosize
                  minRows={2}
                  sx={{ width: "700px" }}
                  classNames={{
                    input: classes.input,
                  }}
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

                {(isShowForm || form.values.tasks.length === 0) &&
                  index === form.values.employees.length - 1 && (
                    <Group position="center">
                      <Button
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
          </Flex>
        )}
      </Box>
    );
  });

  return (
    <div>
      <Box mx="auto">{fields.reverse()}</Box>
    </div>
  );
};

export default AddExtraTaskForm;
