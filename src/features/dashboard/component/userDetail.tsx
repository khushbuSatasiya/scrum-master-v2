import React, { FC } from "react";

import { Flex, Image, Paper, Space, Tabs, Text } from "@mantine/core";
import { IconMail, IconUserStar } from "@tabler/icons-react";

import { IUserInfoArr } from "../interface/dashboard";

interface IProps {
  activeTab: string;
  USER_INFO_ARR: IUserInfoArr[];
  newToken: any;
}

const UserDetail: FC<IProps> = ({ USER_INFO_ARR, activeTab, newToken }) => {
  return (
    <Paper shadow="sm" radius="lg" m={40} p="30px 30px 0px">
      <Flex>
        <Image
          maw={160}
          radius="md"
          src={newToken.avtar ?? newToken.avtar}
          alt={newToken?.realName}
        />
        <Space w="xl" />
        <Flex direction="column">
          <Text fw="700" fz="xl">
            {newToken?.realName}
          </Text>
          <Flex mt={5} direction="row" justify="start" align="center">
            <IconUserStar size="16" color="#B5B5C3" />
            <Space w="5px" />
            <Text c="dimmed" fz="md">
              {newToken?.bio ? newToken?.bio : "Employee"}
            </Text>
            <Space w="xl" />
            <IconMail size={18} color="#B5B5C3" />
            <Space w="5px" />
            <Text c="dimmed" fz="md">
              {newToken?.email ? newToken?.email : "-"}
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
  );
};

export default UserDetail;
