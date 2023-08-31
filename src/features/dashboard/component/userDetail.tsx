import React, { FC, Fragment, useState } from "react";
import isEmpty from "lodash/isEmpty";

import {
  Anchor,
  Button,
  Flex,
  Image,
  Paper,
  Space,
  Tabs,
  Text,
} from "@mantine/core";
import { IconMail, IconUserStar } from "@tabler/icons-react";

import { getTotalWorkingHourColor } from "shared/util/utility";

import { IUserDetail, IUserInfoArr } from "../interface/dashboard";

interface IProps {
  activeTab: string;
  USER_INFO_ARR: IUserInfoArr[];
  newToken: IUserDetail;
  totalWorkingHour: string;
  leaveDetails: Record<string, any>;
  setIsShowUserDetails: (action: boolean) => void;
  isShowUserDetails: boolean;
}

const UserDetail: FC<IProps> = (props: IProps) => {
  const {
    USER_INFO_ARR,
    activeTab,
    newToken,
    totalWorkingHour,
    leaveDetails,
    setIsShowUserDetails,
    isShowUserDetails,
  } = props;

  const LEAVE_DETAILS = [
    {
      label: "Granted Leave",
      value: leaveDetails.grantedLeaves,
      color: "#40c057",
    },
    {
      label: "Vac... Leave",
      value: leaveDetails.vacationLeaves,
      color: "#228be6",
    },
    {
      label: "Comp... Leave",
      value: leaveDetails.compensationLeaves,
      color: "#FF9B38",
    },
    {
      label: "Used Leave",
      value: leaveDetails.usedLeaves,
      color: "#fa5252",
    },
    {
      label: "Rem... Leave",
      value: leaveDetails.remainingLeaves,
      color: "#40c057",
    },
  ];

  const renderPaper = (label, value, color) => (
    <Paper
      sx={{
        border: "1px dashed #DBDFE9",
        borderRadius: "10px",
        width: "125px",
        padding: "6px 10px",
      }}
    >
      <Text fw="bold" fz="22px" c={"#071437"}>
        {value || "0"}
      </Text>
      <Text c={color} fw="500" fz="sm">
        {label}
      </Text>
    </Paper>
  );
  const totalExperience = newToken?.experience / 365;

  return (
    <Paper
      shadow="sm"
      radius="lg"
      m={"20px 20px 10px"}
      p="30px 30px 0px"
      pos={"relative"}
    >
      <Flex>
        <Image
          maw={160}
          radius="md"
          src={newToken?.avtar ?? newToken?.avtar}
          alt={newToken?.realName}
        />
        <Space w="xl" />

        <Flex direction="column">
          <Text
            fw="600"
            fz="xl"
            color="#071437"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "#228be6",
              },
            }}
            onClick={() => setIsShowUserDetails(!isShowUserDetails)}
          >
            {newToken?.realName ? newToken.realName : "-"}
          </Text>
          <Flex mt={5} direction="row" justify="start" align="center">
            <IconUserStar size="16" color="#B5B5C3" />
            <Space w="5px" />
            <Text fz="14px" fw={500} c="#B5B5C3">
              {newToken?.bio ? newToken?.bio : "Team Member"}
            </Text>
            <Space w="xl" />
            <IconMail size={16} color="#B5B5C3" />
            <Space w="5px" />
            <Text fz="14px" fw={500} c="#B5B5C3">
              {newToken?.email ? newToken?.email : "-"}
            </Text>
          </Flex>
          <Space h="lg" />
          <Flex gap="lg">
            <Paper
              sx={{
                border: "1px dashed #DBDFE9",
                borderRadius: "10px",
                width: "100px",
                padding: "6px 10px",
              }}
            >
              <Text fw="bold" fz="22px" c={"#071437"}>
                {newToken?.projectCount || 0}
              </Text>
              <Text c="#B5B5C3" fz="sm" fw={500}>
                Projects
              </Text>
            </Paper>
            <Paper
              sx={{
                border: "1px dashed #DBDFE9",
                borderRadius: "10px",
                width: "100px",
                padding: "6px 10px",
              }}
            >
              <Text fw="bold" fz="22px" c={"#071437"}>
                {totalExperience ? totalExperience.toFixed(1) : 0}
              </Text>
              <Text c="#B5B5C3" fz="sm" fw={500}>
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
                <Text fw="bold" fz="22px" color="#071437">
                  {totalWorkingHour ? totalWorkingHour : "-"}
                </Text>
                <Text
                  color={getTotalWorkingHourColor(totalWorkingHour)}
                  fw="500"
                  fz="sm"
                >
                  Working Hours
                </Text>
              </Paper>
            )}

            {!isEmpty(leaveDetails) &&
              LEAVE_DETAILS.map(({ label, value, color }, index) => {
                return (
                  <Fragment key={index}>
                    {label === "Vacation Leave" &&
                      leaveDetails.vacationLeaves > 0 &&
                      renderPaper(label, value, color)}
                    {label !== "Vacation Leave" &&
                      renderPaper(label, value, color)}
                  </Fragment>
                );
              })}
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={{ position: "absolute", top: 15, right: 15 }}>
        <Button compact>
          <Anchor
            href="https://docs.google.com/document/d/1TfUVxotVmZ1Ctj2flcuOwzVNUr-UL99H/edit"
            target="_blank"
            sx={{
              color: "white",
              "&:hover": {
                textDecoration: "none",
              },
            }}
            fw={"lighter"}
          >
            Leave Policy
          </Anchor>
        </Button>
        <Button compact ml={8}>
          <Anchor
            href="https://drive.google.com/file/d/1rEK3UmEOAmegnf11vKrHzG1RJD5WKHyi/view?usp=share_link"
            target="_blank"
            sx={{
              color: "white",
              border: "none",
              "&:hover": {
                textDecoration: "none",
              },
            }}
            fw={"lighter"}
          >
            Handbook
          </Anchor>
        </Button>
        <Button compact ml={8}>
          <Anchor
            href="https://docs.google.com/document/d/1bDzOoZI8itijukUC_VeAnPKv6rf0dOfKgWJlGFjVRXA/edit"
            target="_blank"
            sx={{
              color: "white",
              border: "none",
              "&:hover": {
                textDecoration: "none",
              },
            }}
            fw={"lighter"}
          >
            Healthy Workplace
          </Anchor>
        </Button>
      </Flex>
      <Tabs.List sx={{ borderBottom: "1px solid transparent" }} mt="20px">
        {USER_INFO_ARR.map(({ label, value }, index) => {
          return (
            <Tabs.Tab
              sx={{
                color: `${
                  activeTab === value ? "#3E97FF !important" : "#99A1B7"
                } `,
                borderColor: `${
                  activeTab === value ? "#3E97FF !important" : ""
                } `,
                fontSize: "14px",
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
