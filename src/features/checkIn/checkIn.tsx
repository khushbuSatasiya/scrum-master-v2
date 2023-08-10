import {
  ActionIcon,
  Box,
  Button,
  Code,
  Flex,
  Group,
  Select,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconClock, IconTrash } from "@tabler/icons-react";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";

interface IProps {
  token: any;
  projectArray: any;
}

const CheckIn: FC<IProps> = ({ token, projectArray }) => {
  console.log("projectArray:", projectArray);
  const ref = useRef<HTMLInputElement>();

  const [projectName, setProjectName] = useState<any>([]);

  const form = useForm({
    initialValues: {
      employees: [{ name: "", key: randomId() }],
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

  const fields = form.values.employees.map((item, index) => (
    <Group key={item.key} mt="xs">
      <Select
        placeholder="Pick one"
        searchable
        nothingFound="No options"
        data={projectName}
      />

      <TextInput
        placeholder="John Doe"
        withAsterisk
        sx={{ flex: 1 }}
        {...form.getInputProps(`employees.${index}.name`)}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("employees", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  return (
    <Flex direction="column" justify="start">
      <Flex align="center">
        <TimeInput
          label="Time (24 hour)"
          ref={ref}
          rightSection={
            <ActionIcon onClick={() => ref.current.showPicker()}>
              <IconClock size="1rem" stroke={1.5} />
            </ActionIcon>
          }
          maw={105}
          // mx="auto"
          withAsterisk
        />
        <Space w="lg" />
        <Button
          variant="outline"
          color="cyan"
          sx={{ width: "105px" }}
          mt="25px"
        >
          Add Task
        </Button>
      </Flex>

      <Box maw={500} mx="auto">
        {fields.length > 0 ? (
          <Group mb="xs"></Group>
        ) : (
          <Text color="dimmed" align="center">
            No one here...
          </Text>
        )}

        {fields}

        <Group position="center" mt="md">
          <Button
            variant="outline"
            color="cyan"
            sx={{ width: "105px" }}
            onClick={() =>
              form.insertListItem("employees", {
                name: "",
                key: randomId(),
              })
            }
          >
            Add Task
          </Button>
        </Group>

        <Text size="sm" weight={500} mt="md">
          Form values:
        </Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>
      </Box>
    </Flex>
  );
};

export default CheckIn;
