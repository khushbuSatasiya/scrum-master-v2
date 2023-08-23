import React, { FC, useEffect, useState } from "react";

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
  Divider,
  TextInput,
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
    userTasks,
  } = props;

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
          <Flex justify={"space-between"}>
            <Paper
              shadow="sm"
              radius="lg"
              mr={30}
              p="lg"
              sx={{
                width: "75%",
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
              <Flex align="center" justify={"space-between"}>
                <Text fz="lg" weight={600} color="#5e6278">
                  Task
                </Text>
                <Text ta="center" fz="lg" weight={500}>
                  {changedDateFormat(checkOutDate)}
                </Text>

                <Flex>
                  {!isShowForm && userTasks.length > 0 && (
                    <Button
                      sx={{ width: "105px" }}
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
              </Flex>
              <Divider my="sm" variant="dashed" />
              <Flex direction={"column-reverse"}>
                {form.values.tasks.map((data: any, index: number) => {
                  return (
                    <Group
                      mt="xs"
                      key={index}
                      sx={{ display: "flex", justifyContent: "start" }}
                    >
                      <Flex direction={"column"} justify={"start"}>
                        <Flex justify={"start"}>
                          <Select
                            label="Project name"
                            placeholder="Project names"
                            dropdownPosition="bottom"
                            mb={"20px"}
                            data={[
                              {
                                label: data.projectName,
                                value: data.projectName,
                              },
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
                            {...form.getInputProps(
                              `tasks.${index}.projectHours`
                            )}
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
                          {...form.getInputProps(`tasks.${index}.taskName`)}
                        />
                      </Flex>
                    </Group>
                  );
                })}

                <AddExtraTaskForm
                  form={form}
                  isShowForm={isShowForm}
                  setIsShowForm={() => setIsShowForm}
                  handleAddTaskBtn={handleAddTaskBtn}
                  projects={projects}
                />
              </Flex>
            </Paper>

            <Paper
              shadow="sm"
              radius="lg"
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
                mt={"10px"}
              >
                <TextInput
                  withAsterisk
                  placeholder="00:00"
                  maxLength={5}
                  mt={24}
                  label="Time (24 hour)"
                  value={form.values.time}
                  // onChange={(e) => handleTimeChange(e)}
                  // classNames={{
                  //   input: classes.input,
                  // }}
                  {...form.getInputProps("time")}
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
                    Check Out
                  </Button>
                </Group>
              </Flex>
            </Paper>
          </Flex>
        </form>
      </Flex>
    </div>
  );
};

export default CheckOutForm;
