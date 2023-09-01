import React, { FC } from "react";

import { isEmpty } from "lodash";
import {
  Box,
  Code,
  Flex,
  List,
  Modal,
  Paper,
  ThemeIcon,
  Text,
  Divider,
} from "@mantine/core";
import { IconChecklist } from "@tabler/icons-react";

import {
  formatDate,
  formatTime,
  getCheckInColor,
  getTotalWorkingHourColor,
} from "shared/util/utility";
import { useStyles } from "../constant/constant";
import { DeadLine } from "shared/constants/constants";

interface ITimeTaskModalProps {
  task: Record<string, any>;
  onClose: () => void;
}
const TimesheetTaskModal: FC<ITimeTaskModalProps> = ({ task, onClose }) => {
  const { classes } = useStyles();

  return (
    <>
      {!isEmpty(task) && (
        <Modal
          centered
          opened={!isEmpty(task)}
          onClose={onClose}
          classNames={{
            title: classes.title,
            header: classes.header,
            close: classes.close,
          }}
          size="1210px"
          padding={20}
          radius="lg"
          overlayProps={{
            opacity: 0.8,
          }}
          transitionProps={{
            transition: "skew-down",
            duration: 0.5,
            timingFunction: "ease-in",
          }}
        >
          <Box>
            <Paper radius={"lg"}>
              <Flex justify={"space-between"} align={"center"} p={"10px 0px"}>
                <Flex>
                  <Flex>
                    <Text fz={14} fw={600} tt="uppercase">
                      in :
                    </Text>
                    <Text
                      fz={14}
                      fw={600}
                      ml={5}
                      color={`${
                        task.inTime
                          ? getCheckInColor(task.inTime, DeadLine.CHECK_IN)
                          : "red"
                      }`}
                    >
                      {formatTime(task.inTime)}
                    </Text>
                  </Flex>
                  <Flex ml={20}>
                    <Text fz={14} fw={600} tt="uppercase">
                      out :
                    </Text>
                    <Text ml={5} fz={14} fw={600} color="green">
                      {formatTime(task.outTime)}
                    </Text>
                  </Flex>
                </Flex>
                <Text fz={14} fw={600} ml={15} mr={15} c={"blue"}>
                  {formatDate(task.date)}
                </Text>
                <Box>
                  <Flex>
                    <Text fz={14} fw={600} tt="uppercase">
                      Total Hours :
                    </Text>
                    <Text
                      fz={14}
                      fw={600}
                      ml={5}
                      // c={"green"}
                      color={
                        task.isHalfLeave === true
                          ? "green"
                          : getTotalWorkingHourColor(task.totalHour)
                      }
                    >
                      {task.totalHour}
                    </Text>
                  </Flex>
                </Box>
              </Flex>

              <Divider variant="dashed" mt={10} mb={20} />

              <Flex align={"flex-start"} justify={"center"} gap={80}>
                <Flex direction="column" w={"100%"}>
                  <Flex
                    justify={"space-between"}
                    gap={30}
                    mb={10}
                    p={"0px 20px"}
                  >
                    <Box sx={{ width: "50%", textAlign: "center" }}>
                      <Code
                        sx={{
                          width: "180px",
                          fontWeight: "bold",
                          color: "#40c057",
                        }}
                        p={"10px"}
                        color="green"
                      >
                        Planned Tasks
                      </Code>
                    </Box>
                    <Box sx={{ width: "50%", textAlign: "center" }}>
                      <Code
                        sx={{
                          width: "180px",
                          fontWeight: "bold",
                          color: "#fd7e14",
                        }}
                        p={"10px"}
                        color="orange"
                      >
                        Out Tasks
                      </Code>
                    </Box>
                  </Flex>

                  <List mt={10} size="md" listStyleType={"circle"}>
                    {task &&
                      task.tasks.map((item, index) => {
                        return (
                          <Paper
                            mb={20}
                            p="md"
                            key={index}
                            sx={{
                              border: "1px dashed #228be6",
                              borderRadius: "16px",
                              backgroundColor: "#f5f8fa",
                            }}
                          >
                            <Flex justify={"space-between"}>
                              <Flex>
                                <ThemeIcon
                                  color="white"
                                  size={24}
                                  radius="xl"
                                  mr={5}
                                >
                                  <IconChecklist size="25px" color="#228be6" />
                                </ThemeIcon>
                                <Text fw={600} mb={10} fz={17} color="#99A1B7">
                                  {item.projectName}
                                </Text>
                              </Flex>

                              {item.totalHours !== null && (
                                <Text fz={14} fw={600} c={"#99A1B7"}>
                                  Project Hours :{" "}
                                  <span
                                    style={{
                                      fontWeight: "600",
                                      marginLeft: "5px",
                                      fontSize: "14px",
                                      color: "#40c057",
                                    }}
                                  >
                                    {item.totalHours}
                                  </span>
                                </Text>
                              )}
                            </Flex>
                            <Flex justify={"space-between"} w={"100%"} gap={30}>
                              <Box sx={{ width: "50%" }}>
                                {item.plannedTask.includes("\n") &&
                                  item.plannedTask
                                    .split("\n")
                                    .filter((task) => task.trim() !== "")
                                    .map((task, index) => {
                                      return (
                                        <List.Item
                                          key={index}
                                          sx={{
                                            fontSize: "14px",
                                          }}
                                        >
                                          <Text
                                            sx={{
                                              maxWidth: "500px",
                                              wordWrap: "break-word",
                                              textWrap: "balance",
                                            }}
                                          >
                                            {task}
                                          </Text>
                                        </List.Item>
                                      );
                                    })}

                                {!item.plannedTask.includes("/n") && (
                                  <List.Item
                                    key={index}
                                    sx={{
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Text
                                      sx={{
                                        maxWidth: "500px",
                                        wordWrap: "break-word",
                                        textWrap: "balance",
                                      }}
                                    >
                                      {item.plannedTask}
                                    </Text>
                                  </List.Item>
                                )}
                              </Box>
                              <Box sx={{ width: "50%" }}>
                                {item.completedTask.includes("\n") &&
                                  item.completedTask
                                    .split("\n")
                                    .filter((task) => task.trim() !== "")
                                    .map((task, index) => {
                                      return (
                                        <Flex key={index}>
                                          <List.Item
                                            sx={{
                                              fontSize: "14px",
                                            }}
                                          >
                                            <Text
                                              sx={{
                                                maxWidth: "500px",
                                                wordWrap: "break-word",
                                                textWrap: "balance",
                                              }}
                                            >
                                              {task}
                                            </Text>
                                          </List.Item>
                                        </Flex>
                                      );
                                    })}
                                {!item.completedTask.includes("\n") &&
                                  item.completedTask
                                    .split("\n")
                                    .filter((task) => task.trim() !== "")
                                    .map((task, index) => {
                                      return (
                                        <Flex key={index}>
                                          <List.Item
                                            sx={{
                                              fontSize: "14px",
                                            }}
                                          >
                                            <Text
                                              sx={{
                                                maxWidth: "500px",
                                                wordWrap: "break-word",
                                                textWrap: "balance",
                                              }}
                                            >
                                              {item.completedTask}
                                            </Text>
                                          </List.Item>
                                        </Flex>
                                      );
                                    })}
                              </Box>
                            </Flex>
                          </Paper>
                        );
                      })}
                  </List>
                </Flex>
              </Flex>
            </Paper>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default TimesheetTaskModal;
