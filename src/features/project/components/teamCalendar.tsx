import React, { FC, useCallback } from "react";

import { Box, Divider, Flex, Group, Modal, Text } from "@mantine/core";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { DotIcon } from "shared/icons/icons";

import "react-big-calendar/lib/css/react-big-calendar.css";

interface IProps {
  calendarInfo: any;
  getTeamReport: (projectId: string, month: string) => void;
  projectId: string;
  setIsShowCalendar: (action: boolean) => void;
}

const TeamCalendar: FC<IProps> = ({
  calendarInfo,
  getTeamReport,
  projectId,
  setIsShowCalendar,
}) => {
  const localizer = momentLocalizer(moment);

  const eventPropGetter = useCallback((event, start, end, isSelected) => {
    const backgroundColor = event.type === "Holiday" ? "green" : "transparent";
    const color = event.type === "Holiday" ? "white" : "black";

    return {
      style: {
        backgroundColor,
        color,
      },
    };
  }, []);
  const handleNavigate = (newDate) => {
    const month = newDate.getMonth() + 1;
    getTeamReport(projectId, month);
  };

  return (
    <Group pos={"relative"}>
      <Modal
        shadow="sm"
        size={"1200px"}
        pos={"relative"}
        centered
        padding={20}
        radius="lg"
        withCloseButton={false}
        opened={true}
        onClose={() => setIsShowCalendar(false)}
      >
        <Text ta="center" c={"#071437"} fz={26} fw={600}>
          Calendar
        </Text>
        <Divider variant="dashed" mb={20} mt={10} />
        <Box>
          <Flex
            wrap={"wrap"}
            justify={"center"}
            align={"center"}
            m={"0 auto"}
            w={"100%"}
          >
            <Calendar
              popup={true}
              localizer={localizer}
              events={calendarInfo}
              views={["month"]}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 650, width: 1000 }}
              titleAccessor="title"
              eventPropGetter={eventPropGetter}
              tooltipAccessor={(event: any) => {}}
              //   resourceIdAccessor={(event: any) => event.id}
              onNavigate={(date, view) => handleNavigate(date)}
            />
          </Flex>
          <Flex
            sx={{
              flexDirection: "column",
              position: "absolute",
              top: 85,
              left: 100,
            }}
          >
            <Flex align={"center"} mb={3}>
              <Flex align={"center"} w={125}>
                <DotIcon fill="yellow" height="10" />
                <Text fz={12} ml={2}>
                  First Half leave
                </Text>
              </Flex>
              <Flex align={"center"}>
                <DotIcon fill="red" height="10" />
                <Text fz={12} ml={2}>
                  Full leave
                </Text>
              </Flex>
            </Flex>
            <Flex align={"center"}>
              <Flex align={"center"} w={125}>
                <DotIcon fill="orange" height="10" />
                <Text fz={12} ml={2}>
                  Second Half leave
                </Text>
              </Flex>
              <Flex align={"center"}>
                <DotIcon fill="blue" height="10" />
                <Text fz={12} ml={2}>
                  WFH
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Modal>
    </Group>
  );
};

export default TeamCalendar;