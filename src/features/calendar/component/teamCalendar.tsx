import React, { FC, useCallback, useEffect, useState } from "react";

import { Box, Flex, Loader, Paper, Text } from "@mantine/core";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import httpService from "shared/services/http.service";
import { API_CONFIG } from "shared/constants/api";
import { teamReportIconColor } from "shared/util/utility";
import { DotIcon } from "shared/icons/icons";

const TeamCalendar: FC = () => {
  const localizer = momentLocalizer(moment);

  const [calendarInfo, setCalendarInfo] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTeamReport = useCallback((month?: string) => {
    setIsLoading(true);
    const params = {
      month: month,
    };
    httpService
      .get(`${API_CONFIG.path.teamReport}`, params)
      .then((res) => {
        setIsLoading(false);

        const info = res.data.map((item) => {
          return {
            start: moment(item.date, "YYYY-MM-DD").toDate(),
            end: moment(item.date, "YYYY-MM-DD").add(1, "hours").toDate(),
            id: item.id,
            title: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DotIcon fill={teamReportIconColor(item)} height="8px" />
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    marginLeft: 2,
                    pointerEvents: "none",
                  }}
                >
                  {item.name}
                </p>
              </div>
            ),
            type: item.type,
          };
        });
        setCalendarInfo(info);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error", error);
      });
  }, []);

  useEffect(() => {
    getTeamReport((new Date().getMonth() + 1).toString());
  }, []);

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      style: {
        backgroundColor: "transparent",
        color: "black",
        // border: "1px solid black",
      },
    }),
    []
  );

  const handleNavigate = (newDate) => {
    const month = newDate.getMonth() + 1;
    getTeamReport(month);
  };

  return (
    <Paper
      pos={"relative"}
      mt={30}
      shadow="sm"
      radius="lg"
      p="lg"
      display={`${isLoading && "flex"}`}
      sx={{ justifyContent: `${isLoading && "center"}` }}
    >
      {isLoading && (
        <Loader
          variant="dots"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 690,
          }}
        />
      )}
      {!isLoading && (
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
              style={{ height: 650, width: 1210 }}
              titleAccessor="title"
              eventPropGetter={eventPropGetter}
              tooltipAccessor={(event: any) => console.log(event, "??")}
              onNavigate={(date, view) => handleNavigate(date)}
            />
          </Flex>
          <Flex
            sx={{
              flexDirection: "column",
              position: "absolute",
              top: 16,
              right: 100,
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
      )}
    </Paper>
  );
};

export default TeamCalendar;
