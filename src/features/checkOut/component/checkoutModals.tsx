import React, { FC } from "react";

import { Button, Flex, Modal, Paper, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

interface IProps {
  setIsConfirm: (action: boolean) => void;
  isConfirm: boolean;
}

const CheckoutModals: FC<IProps> = ({ isConfirm, setIsConfirm }) => {
  return (
    <Modal
      opened={isConfirm}
      onClose={() => setIsConfirm(false)}
      centered
      padding={35}
      radius="lg"
      withCloseButton={false}
    >
      <Paper radius="lg">
        <Flex align={"center"} direction={"column"}>
          <Flex justify="center" align="center" direction="column" mb={20}>
            <IconAlertTriangle size="120" color="red" />
          </Flex>
          <Text ta="center" mb={30} weight={600} color="#99A1B7">
            Please add atleast 1 task
          </Text>

          <Button
            variant="outline"
            color="red"
            onClick={() => {
              setIsConfirm(false);
            }}
          >
            OK
          </Button>
        </Flex>
      </Paper>
    </Modal>
  );
};

export default CheckoutModals;
