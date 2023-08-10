import { Box, Flex, Image, Paper, Space, Tabs, Text } from "@mantine/core";
import { IconMail, IconUserStar } from "@tabler/icons-react";
import CheckIn from "features/checkIn/checkIn";
import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_CONFIG } from "shared/constants/api";
import httpService from "shared/services/http.service";

const Dashboard: FC = () => {
  const { token }: any = useParams();

  const [userDetails, setUserDetails] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<string | null>("check-in");
  const [projectArray, setProjectArray] = useState<any>([]);

  const getUserDetails = useCallback((token: any) => {
    httpService
      .get(`${API_CONFIG.path.getUserDetails}?token=${token}`)

      .then((res) => {
        setUserDetails(res.findUser[0]);
        setProjectArray(res.projects);
      })
      .catch((err) => {
        // err?.response?.status && setStatusCode(err?.response.status || "");
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getUserDetails(token);
    localStorage.setItem("token", token);
  }, [getUserDetails, token]);

  const USER_INFO_ARR = [
    {
      label: "Check In",
      value: "check-in",
      content: <CheckIn token={token} projectArray={projectArray} />,
    },
    {
      label: "Projects",
      value: "projects",
      content: "Project tab content",
    },
    {
      label: "Time Sheet",
      value: "timesheet",
      content: "time sheet",
    },
    {
      label: "Leave Report",
      value: "leavereport",
      content: "Leave Report",
    },
  ];

  return (
    <div>
      <Box
        sx={{
          width: "1250px",
          margin: "0 auto",
        }}
      >
        <Tabs
          defaultValue="overview"
          onTabChange={(data) => {
            setActiveTab(data);
          }}
        >
          <Paper shadow="sm" radius="lg" m={40} p="30px 30px 0px">
            <Flex>
              <Image
                maw={160}
                radius="md"
                src={userDetails.avtar ?? userDetails.avtar}
                alt={userDetails?.realName}
              />
              <Space w="xl" />
              <Flex direction="column">
                <Text fw="700" fz="xl">
                  {userDetails?.realName}
                </Text>
                <Flex mt={5} direction="row" justify="start" align="center">
                  <IconUserStar size="16" color="#B5B5C3" />
                  <Space w="5px" />
                  <Text c="dimmed" fz="md">
                    {userDetails?.bio ? userDetails?.bio : "Employee"}
                  </Text>
                  <Space w="xl" />
                  <IconMail size={18} color="#B5B5C3" />
                  <Space w="5px" />
                  <Text c="dimmed" fz="md">
                    {userDetails?.email ? userDetails?.email : "-"}
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
                      0{/* {userDetails.projectCount} */}
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
                      0{/* {totalExperience.toFixed(1)} */}
                    </Text>
                    <Text c="#B5B5C3" fw="bold" fz="sm">
                      Experience
                    </Text>
                  </Paper>
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
    </div>
  );
};

export default Dashboard;
