import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import { isEmpty, isNull } from "lodash";
import {
  Avatar,
  Box,
  Flex,
  LoadingOverlay,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";

import NoRecords from "shared/components/noRecords/noRecords";
import { API_CONFIG } from "shared/constants/api";
import httpService from "shared/services/http.service";
import { dateFormate } from "shared/util/utility";

interface IProjectsProps {
  uId: string;
}
const Project: FC<IProjectsProps> = ({ uId }) => {
  const [isLoading, setLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useState([]);

  /* API call to get Project list */
  const getProjectList = useCallback(() => {
    setLoading(true);
    httpService
      .get(`${API_CONFIG.path.projectList}/?userId=${uId ? uId : ""}`)
      .then((res) => {
        setProjectInfo(res.data);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error("Error", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getProjectList();
  }, []);
  return (
    <Box mt={30}>
      {/*<Paper shadow='sm' radius='lg' m={'0 20px'} p={20}>*/}
      <Text mb={15} c={"#071437"} fw={600} fz={"22px"}>
        My Projects
      </Text>

      {/* {isLoading && (
        <LoadingOverlay
          loaderProps={{
            size: "xl",
          }}
          visible={isLoading}
          overlayBlur={2}
        />
      )} */}

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
                    <Flex align={"center"}>
                      {!isNull(logo) && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: logo,
                          }}
                        ></div>
                      )}

                      <Text c={"#071437"} fz={17} fw={600} ml={20}>
                        {projectName}
                      </Text>
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
                                  <Avatar radius="xl">{`+${
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

      {isEmpty(projectInfo) && !isLoading && <NoRecords />}
      {/*</Paper>*/}
    </Box>
  );
};

export default Project;
