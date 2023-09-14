import React, { FC } from "react";
import { Box, Flex, Text } from "@mantine/core";
import { IconMoodSadDizzy } from "@tabler/icons-react";

const NoRecords: FC = () => {
  return (
    <Flex
      direction={"column"}
      align={"center"}
      sx={{ height: "75vh" }}
      justify={"center"}
    >
      <Box
        p={4}
        mb={4}
        sx={(theme) => ({
          width: "48px",
          fontSize: 0,
          color: theme.colors.gray[5],
          border: `2px solid ${theme.colors.gray[4]}`,
          borderRadius: theme.radius.md,
          background: theme.colors.gray[1],
        })}
      >
        <IconMoodSadDizzy size={36} strokeWidth={1.5} />
      </Box>
      <Text color="#868e96" fz={"sm"}>
        No records found
      </Text>
    </Flex>
  );
};

export default NoRecords;
