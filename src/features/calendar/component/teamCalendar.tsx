import React, { FC, useCallback, useEffect, useState } from "react";

import { Box, Flex, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useDispatch } from "react-redux";
import * as actionTypes from "store/action-types";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import httpService from "shared/services/http.service";
import { API_CONFIG } from "shared/constants/api";
import { createAction, teamReportIconColor } from "shared/util/utility";
import { DotIcon } from "shared/icons/icons";

import CalendarFilter from "./calendarFilter";

import "../style/calendar.scss";

const TeamCalendar: FC = () => {
  const localizer = momentLocalizer(moment);

  const dispatch = useDispatch();

  const [calendarInfo, setCalendarInfo] = useState<any>([]);
  const [proList, setProList] = useState<any>([]);
  const [usersList, setUsersList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uId, setUId] = useState("");
  const [pId, setPId] = useState("");

  const form = useForm({
    initialValues: {
      filteredData: "All",
      userId: "",
      projectId: "",
    },
  });

  const getTeamReport = useCallback(
    (
      projectId?: string,
      month = (new Date().getMonth() + 1).toString(),
      userId?: string
    ) => {
      dispatch(createAction(actionTypes.SET_MONTH, month));
      // month && setIsLoading(true);

      const params = {
        month,
        projectId,
        userId,
      };

      httpService
        .get(`${API_CONFIG.path.teamReport}`, params)
        .then((res) => {
          // month && setIsLoading(false);

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
                  {item.type !== "Holiday" && (
                    <DotIcon fill={teamReportIconColor(item)} height="8px" />
                  )}
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
          month && setIsLoading(false);
          console.error("Error", error);
        });
    },
    []
  );

  useEffect(() => {
    getTeamReport();
  }, [getTeamReport]);

  const getProjects = useCallback(() => {
    httpService
      .get(`${API_CONFIG.path.projects}`)
      .then((res) => {
        const proList = res.data.map((item) => {
          return {
            label: item.projectName,
            value: item.id,
          };
        });
        setProList(proList);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const getUsers = useCallback(() => {
    httpService
      .get(`${API_CONFIG.path.userList}`)
      .then((res) => {
        const userList = res.data.map((item) => {
          return {
            label: item.name,
            value: item.userId,
          };
        });
        setUsersList(userList);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

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
    getTeamReport(pId, month, uId);
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
      {/* {isLoading && (
        <Loader
          variant="dots"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 690,
          }}
        />
      )} */}
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
              tooltipAccessor={(event: any) => console.log()}
              onNavigate={(date, view) => handleNavigate(date)}
              className="team-calendar"
              popupOffset={{ x: 0, y: 0 }}
            />
          </Flex>

          <Flex
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
            }}
          >
            <CalendarFilter
              proList={proList}
              usersList={usersList}
              getTeamReport={getTeamReport}
              form={form}
              setUId={setUId}
              setPId={setPId}
            />
          </Flex>
        </Box>
      )}
    </Paper>
  );
};

export default TeamCalendar;
