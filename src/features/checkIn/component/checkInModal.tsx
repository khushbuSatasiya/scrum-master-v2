import React, { FC } from "react";

import { Button, Flex, Modal, Paper, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

import { ICheckInValues } from "../interface/checkIn";

interface IProps {
  isConfirm: boolean;
  setIsConfirm: (action: boolean) => void;
  confirmCheckIn: (values: ICheckInValues) => void;
  isAlreadyCheckIn: boolean;
  setIsAlreadyCheckIn: (action: boolean) => void;
  checkStatus: () => void;
  checkInValue: ICheckInValues;
  isLoading: boolean;
  setIsLoading: (action: boolean) => void;
}

const CheckInModal: FC<IProps> = (props: IProps) => {
  const {
    isConfirm,
    setIsConfirm,
    confirmCheckIn,
    isAlreadyCheckIn,
    setIsAlreadyCheckIn,
    checkStatus,
    checkInValue,
    isLoading,
    setIsLoading,
  } = props;
  return (
    <div>
      <Modal
        size="auto"
        opened={isConfirm}
        onClose={() => setIsConfirm(false)}
        centered
        padding={40}
        radius="lg"
        withCloseButton={false}
      >
        <Paper radius="lg">
          <Flex align={"center"} direction={"column"}>
            <Flex justify="center" align="center" direction="column" mb={20}>
              <IconAlertTriangle size="120" color="Orange" />
            </Flex>
            <Text ta="center" mb={30} weight={600} color="#99A1B7">
              Do you want to check in without adding tasks?
            </Text>
            <Flex>
              <Button
                variant="outline"
                mr={18}
                loading={isLoading}
                loaderPosition="left"
                loaderProps={{
                  size: "sm",
                  color: "#15aabf",
                  variant: "oval",
                }}
                onClick={() => confirmCheckIn(checkInValue)}
              >
                Yes
              </Button>
              <Button
                variant="outline"
                color="red"
                onClick={() => {
                  setIsConfirm(false);
                  setIsLoading(false);
                }}
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </Paper>
      </Modal>

      <Modal
        size="auto"
        opened={isAlreadyCheckIn}
        onClose={() => setIsAlreadyCheckIn(false)}
        centered
        padding={40}
        radius="lg"
        withCloseButton={false}
      >
        <Paper radius="lg">
          <Flex align={"center"} direction={"column"}>
            <Flex justify="center" align="center" direction="column" mb={20}>
              <IconAlertTriangle size="120" color="Orange" />
            </Flex>
            <Text ta="center" mb={30} weight={600} color="#99A1B7">
              You already check in
            </Text>

            <Button
              variant="outline"
              color="red"
              onClick={() => {
                setIsAlreadyCheckIn(false);
                checkStatus();
              }}
            >
              OK
            </Button>
          </Flex>
        </Paper>
      </Modal>
    </div>
  );
};

export default CheckInModal;
