import React, { FC } from "react";

import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Space,
  Text,
  Divider,
  TextInput,
} from "@mantine/core";

import { getTodayDate } from "shared/util/utility";

import { ICheckInValues } from "../interface/checkIn";

interface IProps {
  form: any;
  handleCheckIn: (values: ICheckInValues) => void;
  fields: any;
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  classes: {
    input: string;
  };
  isConfirm: boolean;
}

const CheckInForm: FC<IProps> = ({
  form,
  handleCheckIn,
  fields,
  handleTimeChange,
  isLoading,
  classes,
  isConfirm,
}) => {
  return (
    <form onSubmit={form.onSubmit((values) => handleCheckIn(values))}>
      <Flex justify={"space-between"}>
        <Paper
          shadow="sm"
          radius="lg"
          mr={30}
          p="lg"
          sx={{
            width: "75%",
            overflowY: "scroll",
            height: "auto",
            maxHeight: "500px",
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
            align={"center"}
            justify={"space-between"}
            pb={"10px"}
            pt={"10px"}
          >
            <Text fz="lg" weight={600} color="#5e6278">
              Task
            </Text>
            <Text ta="center" fz="lg" weight={500} color="#5e6278">
              {getTodayDate()}
            </Text>

            <Text
              fz="lg"
              weight={500}
              sx={{ marginRight: "15px", visibility: "hidden" }}
            >
              Check In
            </Text>
          </Flex>
          <Divider my="sm" variant="dashed" />
          {fields.length > 0 ? <Group mb="xs"></Group> : <></>}
          {fields.length > 0 && <Box>{fields.reverse()}</Box>}
        </Paper>

        <Paper
          shadow="sm"
          radius="lg"
          p="lg"
          sx={{
            width: "25%",
            height: "300px",
          }}
        >
          <Flex align={"center"} justify={"center"} pb={"10px"} pt={"10px"}>
            <Text fz="lg" weight={600} color="#5e6278">
              Time
            </Text>
          </Flex>

          <Divider my="sm" variant="dashed" />
          <Flex
            direction={"column"}
            align={"center"}
            justify={"space-between"}
            sx={{ height: "180px" }}
            mt={"10px"}
          >
            <TextInput
              withAsterisk
              placeholder="00:00"
              maxLength={5}
              mt={24}
              label="(24 hour)"
              value={form.values.time}
              classNames={{
                input: classes.input,
              }}
              ta={"center"}
              labelProps={{ style: { color: "#5e6278" } }}
              onChange={(e) => handleTimeChange(e)}
              {...form.getInputProps("time")}
            />

            <Space w="lg" />
            <Group position="center">
              <Button
                type="submit"
                sx={{ width: "140px", marginTop: "20px" }}
                loading={!isConfirm && isLoading}
                disabled={isLoading}
                loaderPosition="left"
                loaderProps={{
                  size: "sm",
                  color: "#15aabf",
                  variant: "oval",
                }}
              >
                Check In
              </Button>
            </Group>
          </Flex>
        </Paper>
      </Flex>
    </form>
  );
};

export default CheckInForm;
