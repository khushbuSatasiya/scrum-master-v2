import React, { FC } from "react";

import {
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
  createStyles,
} from "@mantine/core";

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

  const useStyles = createStyles(() => ({
    input: {
      backgroundColor: "#f5f8fa",
      color: "5e6278",
      fontWight: "500",
      border: "transparent",
      // border: "transparent",
    },
  }));

  const { classes } = useStyles();

  return (
    <Flex direction="column" justify="center" mt={30}>
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
              <Text
                ta="center"
                fz="lg"
                weight={500}
                sx={{ visibility: "hidden" }}
              >
                {changedDateFormat(checkOutDate)}
              </Text>
            </Flex>
            <Divider my="sm" variant="dashed" />
            {form.values.tasks.map((data: any, index: number) => {
              return (
                <Flex direction={"column"} key={index}>
                  <Group
                    mt="xs"
                    mb="xs"
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    <Flex direction={"column"} justify={"start"}>
                      <Flex justify={"start"}>
                        <Select
                          placeholder="Project names"
                          dropdownPosition="bottom"
                          mb={"20px"}
                          classNames={{
                            input: classes.input,
                          }}
                          data={[
                            {
                              label: data.projectName,
                              value: data.projectName,
                            },
                          ]}
                          value={data.projectName}
                        />

                        <TextInput
                          withAsterisk
                          placeholder="00:00"
                          maxLength={5}
                          maw={270}
                          classNames={{
                            input: classes.input,
                          }}
                          sx={{ marginLeft: "20px" }}
                          // value={form.values.time}
                          {...form.getInputProps(`tasks.${index}.projectHours`)}
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
                        onKeyDown={(event) => {
                          if (
                            event.key === " " &&
                            event.currentTarget.selectionStart === 0
                          ) {
                            event.preventDefault();
                          }
                        }}
                        value={form.values.tasks[index].taskName || ""}
                        {...form.getInputProps(`tasks.${index}.taskName`)}
                      />
                    </Flex>
                  </Group>

                  <Divider my="sm" variant="dashed" />
                </Flex>
              );
            })}
            <Flex justify={"end"}>
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
            <AddExtraTaskForm
              form={form}
              isShowForm={isShowForm}
              setIsShowForm={() => setIsShowForm}
              handleAddTaskBtn={handleAddTaskBtn}
              projects={projects}
              classes={classes}
            />
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
            <Flex align={"center"} justify={"center"}>
              <Text fz="lg" weight={600} color="#5e6278" p={0}>
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
                classNames={{
                  input: classes.input,
                }}
                label="Time (24 hour)"
                ta={"center"}
                labelProps={{ style: { color: "#5e6278" } }}
                value={form.values.time}
                // onChange={(e) => handleTimeChange(e)}
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
  );
};

export default CheckOutForm;
