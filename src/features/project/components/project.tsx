import React, { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { isEmpty } from "lodash";

import { Box, Text } from "@mantine/core";
import moment from "moment";

import NoRecords from "shared/components/noRecords/noRecords";
import { API_CONFIG } from "shared/constants/api";
import httpService from "shared/services/http.service";
import authService from "shared/services/auth.service";

import {
  IExcelProps,
  IProjectProps,
  IProjectsProps,
} from "../interface/project";

import ExcelDownload from "./excelDownload";
import TeamProfile from "./teamProfile";
import ProjectCard from "./projectCard";
import TeamCalendar from "./teamCalendar";
import { DotIcon } from "shared/icons/icons";
import { teamReportIconColor } from "shared/util/utility";

const Project: FC<IProjectsProps> = ({ uId }) => {
  const [isLoading, setLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useState<IProjectProps[]>();
  const [projectId, setProjectId] = useState("");
  const [teamInfo, setTeamInfo] = useState([]);
  const [calendarInfo, setCalendarInfo] = useState<any>([]);
  const [projectName, setProjectName] = useState("");
  const [excelData, setExcelData] = useState<IExcelProps>();
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const navigate = useNavigate();

  /* API call to get Project list */
  const getProjectList = useCallback(() => {
    setLoading(true);
    httpService
      .get(`${API_CONFIG.path.projectList}`)
      .then((res) => {
        setProjectInfo(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          authService.removeAuthData();
          navigate("/token-expired");
        }
        console.error("Error", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getProjectList();
  }, []);

  const getTeamReport = useCallback(
    (projectId?: string, month?: string, projectName?: string) => {
      setProjectName(projectName);
      setProjectId(projectId);
      const params = {
        month: month,
        projectId: projectId,
      };
      httpService
        .get(`${API_CONFIG.path.teamReport}`, params)
        .then((res) => {
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
          console.error("Error", error);
        });
    },
    []
  );

  return (
    <Box mt={30}>
      <Text mb={15} c={"#071437"} fw={600} fz={"22px"}>
        My Projects
      </Text>

      <ProjectCard
        projectInfo={projectInfo}
        setTeamInfo={setTeamInfo}
        setExcelData={setExcelData}
        uId={uId}
        isLoading={isLoading}
        getTeamReport={getTeamReport}
        setIsShowCalendar={setIsShowCalendar}
      />

      {!isEmpty(teamInfo) && (
        <TeamProfile teamInfo={teamInfo} setTeamInfo={setTeamInfo} />
      )}
      {!isEmpty(excelData) && (
        <ExcelDownload excelData={excelData} setExcelData={setExcelData} />
      )}

      {isShowCalendar && (
        <TeamCalendar
          calendarInfo={calendarInfo}
          getTeamReport={getTeamReport}
          projectId={projectId}
          setIsShowCalendar={setIsShowCalendar}
          projectName={projectName}
        />
      )}

      {isEmpty(projectInfo) && !isLoading && <NoRecords />}
    </Box>
  );
};

export default Project;
