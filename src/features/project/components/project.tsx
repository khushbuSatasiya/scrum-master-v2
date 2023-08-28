import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty, isNull } from "lodash";
import {
  Avatar,
  Box,
  Flex,
  LoadingOverlay,
  Menu,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";

import NoRecords from "shared/components/noRecords/noRecords";
import { API_CONFIG } from "shared/constants/api";
import httpService from "shared/services/http.service";
import { dateFormate } from "shared/util/utility";
import authService from "shared/services/auth.service";
import TeamProfile from "./teamProfile";
import { IconDotsVertical,  IconUserCircle } from "@tabler/icons-react";
import { IconFileDownload } from "@tabler/icons-react";
import ExcelDownload from "./excelDownload";
import { IExcelProps, IProjectsProps } from "../interface/project";



const Project: FC<IProjectsProps> = ({ uId }) => {
  const [isLoading, setLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useState([]);
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
        <Flex align={"center"} wrap={"wrap"} gap={30}>
          {projectInfo.map(
            ({ projectId, projectName, teamDetails, date, logo }, index) => {
              
              return (
                <Paper
                  shadow="sm"
                  p={20}
                  w={"31.5%"}
                  radius="md"
                  sx={{ border: "1px solid #f3f4fa" }}
                  key={index}
                >
                  <Fragment key={projectId}>
                    <Flex align={"center"} justify={'space-between'}>
                  <Flex align={'center'}>
                  {!isNull(logo) && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: logo,
                          }}
                        ></div>
                      )}

                      <Text c={"#071437"} fz={17} fw={600} ml={5}>
                        {projectName}
                      </Text>
                  </Flex>

                      <Menu width={50} shadow='md' withArrow position='bottom-end' trigger='hover'>
										<Menu.Target>
											<IconDotsVertical size={20} style={{ cursor: 'pointer' }} />
										</Menu.Target>

										<Menu.Dropdown>
											<Menu.Item  onClick={()=>setTeamInfo(teamDetails)} icon={<IconUserCircle color='#228be6' />}></Menu.Item>
											<Menu.Item
												 onClick={()=>setExcelData({
                                                    projectName:projectName,
                                                    projectId:projectId,
                                                   date:new Date(),
                                                    teamDetails:teamDetails

                                                 })}
												icon={<IconFileDownload color='#40bf4a' />}
											></Menu.Item>
											
										</Menu.Dropdown>
									</Menu>
                    </Flex>
                    <Box mt={5}>
                      <Text c={"#B5B5C3"} fw={500} fz={14}>
                        Created Date
                      </Text>
                      <Text c={"#071437"} fz={16} fw={600}>
                        {dateFormate(date)}
                      </Text>
                    </Box>

                    <Text c={"#B5B5C3"} fw={500} fz={14} mt={10} mb={5}>
                      Team
                    </Text>
                    <Flex>
                      <Avatar.Group spacing="xs" sx={{ cursor: "pointer" }}>
                        {teamDetails.map(
                          ({ avatar, realName, id }, index: number) => {
                            return (
                              <Box key={id}>
                                {index < 8 && (
                                  <Tooltip
                                    withArrow
                                    inline
                                    label={realName}
                                    color="#1c7ed6"
                                    transitionProps={{
                                      transition: "slide-down",
                                      duration: 300,
                                    }}
                                  >
                                    <Avatar
                                      size="35px"
                                      src={avatar}
                                      radius="xl"
                                    />
                                  </Tooltip>
                                )}
                                {index === 8 && (
                                  <Avatar radius="xl" onClick={()=>setTeamInfo(teamDetails)}>{`+${
                                    teamDetails.length - 8
                                  }`}</Avatar>
                                )}
                              </Box>
                            );
                          }
                        )}
                      </Avatar.Group>
                    </Flex>
                  </Fragment>
                </Paper>
              );
            }
          )}
        </Flex>
      )}

    {!isEmpty(teamInfo) && <TeamProfile teamInfo={teamInfo} setTeamInfo={setTeamInfo}/>}
    {!isEmpty(excelData) && <ExcelDownload excelData={excelData} setExcelData={setExcelData}/>}
      {isEmpty(projectInfo) && !isLoading && <NoRecords />}

    </Box>
  );
};

export default Project;
