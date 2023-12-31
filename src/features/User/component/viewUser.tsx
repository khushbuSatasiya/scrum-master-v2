import React, { FC, Fragment, useState } from "react";
import { Box, Flex, Image, Paper, Space, Tabs, Text } from "@mantine/core";
import { IconMail, IconUserStar } from "@tabler/icons-react";
import { isEmpty } from "lodash";

import { getTotalWorkingHourColor } from "shared/util/utility";

import { IUserInfo } from "../interface/user";
import {
  LEAVE_DETAILS,
  USERINFO,
  USER_INFO_ARR,
} from "../constants/userConstants";

const ViewUser: FC = () => {
  const [userData] = useState<IUserInfo>(USERINFO);
  const [activeTab, setActiveTab] = useState<string | null>("overview");
  const [LeaveDetails, setLeaveDetails] = useState<Record<string, any>>({});
  const [totalWorkingHour, setTotalWorkingHour] = useState<string>("");

  const totalExperience = userData.experience / 365;

  const renderPaper = (label, value, color) => (
    <Paper
      sx={{
        border: "1px dashed #DBDFE9",
        borderRadius: "10px",
        width: "125px",
        padding: "6px 10px",
      }}
    >
      <Text fw="bold" fz="24px">
        {value || "0"}
      </Text>
      <Text c={color} fw="bold" fz="sm">
        {label}
      </Text>
    </Paper>
  );

  return (
    <Box>
      <Tabs
        defaultValue="overview"
        onTabChange={(data) => {
          data !== "leavereport" && setLeaveDetails({});
          data !== "timesheet" && setTotalWorkingHour("");
          setActiveTab(data);
        }}
      >
        <Paper shadow="sm" radius="lg" m={40} p="30px 30px 0px">
          <Flex>
            <Image
              maw={160}
              radius="md"
              src={userData.avatar ?? userData.avatar}
              alt={userData?.realName}
            />
            <Space w="xl" />
            <Flex direction="column">
              <Text fw="700" fz="xl">
                {userData?.realName}
              </Text>
              <Flex mt={5} direction="row" justify="start" align="center">
                <IconUserStar size="16" color="#B5B5C3" />
                <Space w="5px" />
                <Text c="dimmed" fz="md">
                  {userData?.designation ? userData?.designation : "Employee"}
                </Text>
                <Space w="xl" />
                <IconMail size={18} color="#B5B5C3" />
                <Space w="5px" />
                <Text c="dimmed" fz="md">
                  {userData?.email ? userData?.email : "-"}
                </Text>
              </Flex>
              <Space h="lg" />
              <Flex gap="lg">
                <Paper
                  sx={{
                    border: "1px dashed #DBDFE9",
                    borderRadius: "10px",
                    width: "125px",
                    padding: "6px 10px",
                  }}
                >
                  <Text fw="bold" fz="24px">
                    {userData.projectCount}
                  </Text>
                  <Text c="#B5B5C3" fw="bold" fz="sm">
                    Projects
                  </Text>
                </Paper>
                <Paper
                  sx={{
                    border: "1px dashed #DBDFE9",
                    borderRadius: "10px",
                    width: "125px",
                    padding: "6px 10px",
                  }}
                >
                  <Text fw="bold" fz="24px">
                    {totalExperience.toFixed(1)}
                  </Text>
                  <Text c="#B5B5C3" fw="bold" fz="sm">
                    Experience
                  </Text>
                </Paper>
                {!isEmpty(totalWorkingHour) && (
                  <Paper
                    sx={{
                      border: "1px dashed #DBDFE9",
                      borderRadius: "10px",
                      width: "125px",
                      padding: "6px 10px",
                    }}
                  >
                    <Text fw="bold" fz="24px">
                      {totalWorkingHour ? totalWorkingHour : "-"}
                    </Text>
                    <Text
                      color={getTotalWorkingHourColor(totalWorkingHour)}
                      fw="bold"
                      fz="sm"
                    >
                      Working Hours
                    </Text>
                  </Paper>
                )}

                {!isEmpty(LeaveDetails) &&
                  LEAVE_DETAILS(LeaveDetails).map(
                    ({ label, value, color }, index) => {
                      return (
                        <Fragment key={index}>
                          {label === "Vacation Leave" &&
                            LeaveDetails.vacationLeaves > 0 &&
                            renderPaper(label, value, color)}
                          {label !== "Vacation Leave" &&
                            renderPaper(label, value, color)}
                        </Fragment>
                      );
                    }
                  )}
              </Flex>
            </Flex>
          </Flex>

          <Tabs.List sx={{ borderBottom: "1px solid transparent" }} mt="20px">
            {USER_INFO_ARR.map(({ label, value }, index) => {
              return (
                <Tabs.Tab
                  sx={{
                    color: `${
                      activeTab === value ? "#228be6 !important" : "#B5B5C3"
                    } `,
                    borderColor: `${
                      activeTab === value ? "#228be6 !important" : ""
                    } `,
                    fontSize: "16px",
                    fontWeight: "bold",
                    paddingBottom: "13px",
                  }}
                  value={value}
                  key={index}
                >
                  {label}
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
        </Paper>

        <Paper shadow="sm" radius="lg" m={40}>
          {USER_INFO_ARR.map(({ content, value }, index) => {
            return (
              <Fragment key={index}>
                {activeTab === value && (
                  <Tabs.Panel value={value} pt="lg" pl="20px" pb="lg">
                    {content}
                  </Tabs.Panel>
                )}
              </Fragment>
            );
          })}
        </Paper>
      </Tabs>
    </Box>
  );
};

export default ViewUser;
