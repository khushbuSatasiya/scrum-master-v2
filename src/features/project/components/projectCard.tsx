import React, { FC, Fragment } from "react";
import { isNull } from "lodash";
import { Avatar, Box, Flex, Menu, Paper, Text, Tooltip } from "@mantine/core";
import {
  IconDotsVertical,
  IconFileDownload,
  IconUserCircle,
} from "@tabler/icons-react";

import { dateFormate } from "shared/util/utility";
import { IProjectProps } from "../interface/project";

interface IProjectCardProps {
  projectInfo: IProjectProps[];
  setTeamInfo: (teamDetails) => void;
  setExcelData: (value) => void;
}

const ProjectCard: FC<IProjectCardProps> = ({
  projectInfo,
  setTeamInfo,
  setExcelData,
}) => {
  return (
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
                <Flex align={"center"} justify={"space-between"}>
                  <Flex align={"center"}>
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

                  <Menu
                    width={50}
                    shadow="md"
                    withArrow
                    position="bottom-end"
                    trigger="hover"
                  >
                    <Menu.Target>
                      <IconDotsVertical
                        size={20}
                        style={{ cursor: "pointer" }}
                      />
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() => setTeamInfo(teamDetails)}
                        icon={<IconUserCircle color="#228be6" />}
                      ></Menu.Item>
                      <Menu.Item
                        onClick={() =>
                          setExcelData({
                            projectName: projectName,
                            projectId: projectId,
                            date: new Date(),
                            teamDetails: teamDetails,
                          })
                        }
                        icon={<IconFileDownload color="#40bf4a" />}
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
                                <Avatar size="35px" src={avatar} radius="xl" />
                              </Tooltip>
                            )}
                            {index === 8 && (
                              <Avatar
                                radius="xl"
                                onClick={() => setTeamInfo(teamDetails)}
                              >{`+${teamDetails.length - 8}`}</Avatar>
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
  );
};

export default ProjectCard;
