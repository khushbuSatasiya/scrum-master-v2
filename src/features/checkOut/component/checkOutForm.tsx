import React, { FC, useEffect, useRef, useState } from "react";

import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Paper,
  Select,
  Space,
  Textarea,
  Text,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";

import { changedDateFormat } from "shared/util/utility";

import AddExtraTaskForm from "./addExtraTaskForm";

interface IProps {
  handleCheckOut: (values: any) => {};
  form: any;
  userTasks: any;
  projects: any;
  isShowForm: boolean;
  setIsShowForm: (action: boolean) => void;
  handleAddTaskBtn: () => void;
  checkOutDate: string;
  isLoading: boolean;
}

const CheckOutForm: FC<IProps> = (props) => {
  const {
    handleCheckOut,
    form,
    projects,
    isShowForm,
    setIsShowForm,
    handleAddTaskBtn,
    checkOutDate,
    isLoading,
  } = props;

  const timeRef = useRef<HTMLInputElement>();

  const [timeInputRefs, setTimeInputRefs] = useState<
    Array<React.RefObject<any>>
  >([]);

  useEffect(() => {
    setTimeInputRefs(
      Array.from({ length: form.values.tasks.length }).map(() =>
        React.createRef()
      )
    );
  }, [form.values.tasks.length]);

  return (
    <div>
      <Flex direction="column" justify="center">
        <form onSubmit={form.onSubmit((values) => handleCheckOut(values))}>
          <Flex align="center" justify={"space-evenly"}>
            {/* <Text>check out</Text> */}
            <Text ta="center" fz="lg" weight={500} mt="md">
              Check out
            </Text>
            <Flex>
              <TimeInput
                label="Time (24 hour)"
                ref={timeRef}
                rightSection={
                  <ActionIcon onClick={() => timeRef.current.showPicker()}>
                    <IconClock size="1rem" stroke={1.5} />
                  </ActionIcon>
                }
                {...form.getInputProps("time")}
                maw={105}
                withAsterisk
              />

              <Space w="lg" />
              {!isShowForm && (
                <Button
                  variant="outline"
                  color="cyan"
                  sx={{ width: "105px" }}
                  mt="25px"
                  onClick={() => {
                    setIsShowForm(!isShowForm);
                    form.setFieldValue("employees", [
                      {
                        task: "",
                        project: "",
                        projectHours: "",
                        active: false,
                      },
                    ]);
                  }}
                >
                  Add Task
                </Button>
              )}
            </Flex>
            <Text ta="center" fz="lg" weight={500} mt="md">
              Date:{changedDateFormat(checkOutDate)}
            </Text>
          </Flex>

          {form.values.tasks.map((data: any, index: number) => {
            return (
              <Paper
                p="md"
                mt={"10px"}
                withBorder={true}
                sx={{ width: "850px", margin: "0 auto" }}
                key={index}
              >
                <Group
                  mt="xs"
                  sx={{ display: "flex", justifyContent: "start" }}
                >
                  <Flex direction={"column"} justify={"start"}>
                    <Flex justify={"start"}>
                      <Select
                        // variant="unstyled"
                        label="Project name"
                        placeholder="Project names"
                        dropdownPosition="bottom"
                        mb={"20px"}
                        data={[
                          { label: data.projectName, value: data.projectName },
                        ]}
                        // disabled
                        value={data.projectName}
                      />
                      <TimeInput
                        label="Enter project spend hours"
                        ref={timeInputRefs[index]}
                        rightSection={
                          <ActionIcon
                            onClick={() =>
                              timeInputRefs[index].current.showPicker()
                            }
                          >
                            <IconClock size="1rem" stroke={1.5} />
                          </ActionIcon>
                        }
                        {...form.getInputProps(`tasks.${index}.projectHours`)}
                        maw={180}
                        withAsterisk
                        sx={{ marginLeft: "20px" }}
                      />
                    </Flex>

                    <Textarea
                      placeholder={`- task 1\n- task 2`}
                      autosize
                      minRows={2}
                      sx={{ width: "700px" }}
                      onKeyDown={(event) => {
                        if (
                          event.key === " " &&
                          event.currentTarget.selectionStart === 0
                        ) {
                          event.preventDefault();
                        }
                      }}
                      value={form.values.tasks[index].taskName}
                      // onChange={
                      //   // form.setFieldValue(
                      //   //   `tasks.${index}.taskName`,
                      //   //   event.target.value
                      //   // )

                      // }
                      {...form.getInputProps(`tasks.${index}.taskName`)}
                    />
                  </Flex>
                </Group>
              </Paper>
            );
          })}

          <AddExtraTaskForm
            form={form}
            isShowForm={isShowForm}
            setIsShowForm={() => setIsShowForm}
            handleAddTaskBtn={handleAddTaskBtn}
            projects={projects}
          />

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
              Check Out
            </Button>
          </Group>
        </form>
      </Flex>
    </div>
  );
};

export default CheckOutForm;
