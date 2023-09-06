import React, { FC } from "react";

import {
  Button,
  Flex,
  Group,
  Paper,
  Select,
  Textarea,
  Text,
  Divider,
  TextInput,
  createStyles,
  Title,
} from "@mantine/core";

import { changedDateFormat, formatTime } from "shared/util/utility";

import { IActionTime } from "features/dashboard/interface/dashboard";

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
  actionTime: IActionTime;
  // handleTimeChange: (e: any) => void;
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
    actionTime,
    // handleTimeChange,
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
                        autosize
                        placeholder={`- task 1\n- task 2`}
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
              sx={{ height: "200px" }}
              mt={"10px"}
              pos={"relative"}
            >
              <Text
                fz="14px"
                weight={600}
                mt={10}
                mb={20}
                color="#99A1B7"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Check in at{" "}
                <Title fz="14px" weight={600} color="#5e6278" ml={4}>
                  {formatTime(actionTime.inTime)}
                </Title>
              </Text>
              <TextInput
                withAsterisk
                placeholder="00:00"
                maxLength={5}
                classNames={{
                  input: classes.input,
                }}
                label="(24 hour)"
                ta={"center"}
                w={205}
                labelProps={{ style: { color: "#5e6278" } }}
                value={form.values.time}
                {...form.getInputProps("time")}
                m={"0 auto"}
                // onChange={(e) => handleTimeChange(e)}
              />
              <Divider
                my="sm"
                variant="dashed"
                sx={{ marginTop: "40px !important" }}
              />
              <Group position="center" pos={"absolute"} bottom={0} left={58}>
                <Button
                  type="submit"
                  sx={{ width: "140px" }}
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
