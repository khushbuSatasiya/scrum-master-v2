import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  NumberInput,
  Text,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

import { isNull } from "lodash";

import { DATE_PICKER_FIELDS, LEAVE_FIELDS } from "../constants/userConstants";

import { IUserList } from "../interface/user";

interface IEditUserInfo {
  editInfo: IUserList;
  editPopup: boolean;
  handleEditPopup: (editPopup: boolean) => void;
}

const EditUser: React.FC<IEditUserInfo> = ({
  editInfo,
  editPopup,
  handleEditPopup,
}) => {
  const {
    avatar,
    realName,
    designation,
    confirmationDate,
    birthDate,
    joiningDate,
    paidLeaveStartDate,
    probationCompletionDate,
    userLeaveBalance,
    vacationalLeave,
  } = editInfo;

  const createDateOrNull = (date) => (isNull(date) ? null : new Date(date));

  const form = useForm({
    initialValues: {
      userLeaveBalance,
      vacationalLeave,
      birthDate: createDateOrNull(birthDate),
      confirmationDate: createDateOrNull(confirmationDate),
      joiningDate: createDateOrNull(joiningDate),
      paidLeaveStartDate: createDateOrNull(paidLeaveStartDate),
      probationCompletionDate: createDateOrNull(probationCompletionDate),
    },
  });
  return (
    <Modal
      size={"xl"}
      opened={editPopup}
      onClose={() => handleEditPopup(false)}
      title="Edit User"
      pos={"relative"}
    >
      <Box sx={{ padding: "10px 20px" }}>
        <Avatar src={avatar} size={120} radius={120} mx="auto" />
        <Text ta="center" fz="lg" weight={500} mt="md">
          {realName}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          {designation}
        </Text>

        <Box mt="md">
          <form onSubmit={form.onSubmit(() => {})}>
            <Flex mt="xl" w={"100%"} gap={"sm"}>
              <Box w={"50%"}>
                {DATE_PICKER_FIELDS.map(
                  ({ label, placeholder, name }, index) => {
                    return (
                      <DatePickerInput
                        key={index}
                        mt="sm"
                        popoverProps={{
                          withinPortal: true,
                        }}
                        label={label}
                        placeholder={placeholder}
                        variant="filled"
                        {...form.getInputProps(name)}
                      />
                    );
                  }
                )}
              </Box>
              <Box w={"50%"}>
                {LEAVE_FIELDS.map(({ label, placeholder, name }, index) => {
                  return (
                    <NumberInput
                      key={index}
                      mt="sm"
                      label={label}
                      placeholder={placeholder}
                      min={0}
                      max={99}
                      precision={1}
                      variant="filled"
                      {...form.getInputProps(name)}
                    />
                  );
                })}
              </Box>
            </Flex>
            <Group position="right" mt="xl">
              <Button type="submit" mt="sm">
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUser;
