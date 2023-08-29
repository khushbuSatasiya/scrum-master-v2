import React, { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import {
  Box,
  LoadingOverlay,
  Text,
} from "@mantine/core";

import NoRecords from "shared/components/noRecords/noRecords";
import { API_CONFIG } from "shared/constants/api";
import httpService from "shared/services/http.service";
import authService from "shared/services/auth.service";

import { IExcelProps, IProjectProps, IProjectsProps } from "../interface/project";
import ExcelDownload from "./excelDownload";
import TeamProfile from "./teamProfile";
import ProjectCard from "./projectCard";

const Project: FC<IProjectsProps> = ({ uId }) => {
  const [isLoading, setLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useState<IProjectProps[]>();
  const[teamInfo,setTeamInfo]=useState([])
  const[excelData,setExcelData]=useState<IExcelProps>()
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


  return (
    <Box mt={30}>
      <Text mb={15} c={"#071437"} fw={600} fz={"22px"}>
        My Projects
      </Text>

      {isLoading && (
        <LoadingOverlay
          loaderProps={{
            size: "xl",
          }}
          visible={isLoading}
          overlayBlur={2}
        />
      )}

      {!isEmpty(projectInfo) && !isLoading && (
        <ProjectCard projectInfo={projectInfo} setTeamInfo={setTeamInfo } setExcelData={setExcelData} uId={uId}/>
      )}

    {!isEmpty(teamInfo) && <TeamProfile teamInfo={teamInfo} setTeamInfo={setTeamInfo}/>}
    {!isEmpty(excelData) && <ExcelDownload excelData={excelData} setExcelData={setExcelData}/>}
      {isEmpty(projectInfo) && !isLoading && <NoRecords />}

    </Box>
  );
};

export default Project;
