import React, { FC } from "react";

import { Flex, Paper, Text } from "@mantine/core";

import { changedDateFormat } from "shared/util/utility";

interface IProps {
  checkOutDate: any;
}
const LeaveOrMissingDay: FC<IProps> = ({ checkOutDate }) => {
  return (
    <Paper
      shadow="sm"
      radius="lg"
      mt={30}
      p="lg"
      sx={{
        width: "100%",
        height: "auto",
        scrollbarWidth: "none",
        "::-webkit-scrollbar": {
          width: "0.5em",
          display: "none",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
        },
      }}
    >
      <Flex
        direction={"column-reverse"}
        align={"center"}
        justify={"center"}
        sx={{
          border: "1px dashed red",
          background: "#FFF5F8",
          borderRadius: "16px",
        }}
        p={15}
      >
        <Flex direction={"column"} mt={10}>
          {checkOutDate.map((date) => (
            <Text key={date} fz={14} fw={600} c={"blue"} mb={5}>
              {changedDateFormat(date)}
            </Text>
          ))}
        </Flex>
        <Text fz={14} fw={600} tt="uppercase" c={"#F1416D"}>
          Please apply leave or add missing day of date:
        </Text>
      </Flex>
    </Paper>
  );
};

export default LeaveOrMissingDay;
