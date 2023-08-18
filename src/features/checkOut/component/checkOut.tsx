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
import { useForm, yupResolver } from "@mantine/form";
import { IconClock, IconTrash } from "@tabler/icons-react";
import { getProjectList } from "shared/util/utility";

interface IProps {
  projectArray: any;
}

const CheckOut: FC<IProps> = ({ projectArray }) => {
  const ref = useRef<HTMLInputElement>();

  const [projectName, setProjectName] = useState<any>([]);

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
  });

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

            // onChange={(data) => console.log(data)}
            // error={employeeErrors[index]?.project && "Project is required"}
            // error={form.errors.project}
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
            // error={employeeErrors[index]?.task && "Task is required"}
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
                  project: { label: "project names", value: "" },
                });
              }}
              // disabled={isAddButtonDisabled(form.values.employees[index])}
            >
              Add Task
            </Button>
          </Group>
        )}
      </Group>
    </Paper>
  ));

  const handleCheckIn = useCallback(async (values: any) => {
    console.log(values, ">>>");
  }, []);

  return (
    <div>
      <Flex direction="column" justify="center">
        <form onSubmit={form.onSubmit((values) => handleCheckIn(values))}>
          <h6>check out</h6>
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
              // loading={isLoading}
              // disabled={isLoading}
              loaderPosition="left"
              loaderProps={{ size: "sm", color: "#15aabf", variant: "oval" }}
            >
              Check Out
            </Button>
          </Group>
        </form>
      </Flex>
    </div>
  );
};

export default CheckOut;
