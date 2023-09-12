import React, { FC, useEffect, useState } from "react";

import {
  Text,
  Modal,
  Paper,
  Divider,
  Flex,
  Image,
  Loader,
  Button,
} from "@mantine/core";

import { isEmpty } from "lodash";

import httpService from "shared/services/http.service";
import { API_CONFIG } from "shared/constants/api";
import { dateFormate } from "shared/util/utility";

interface IProps {
  isShowUserDetails: boolean;
  setIsShowUserDetails: (action: boolean) => void;
}

const UserInfoPopup: FC<IProps> = ({
  isShowUserDetails,
  setIsShowUserDetails,
}) => {
  const [userDetail, setUserDetail] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  /* API call for get profile data*/
  const getProfile = async () => {
    setIsLoading(true);
    try {
      await httpService.get(API_CONFIG.path.profile).then((res) => {
        setIsLoading(false);

        setUserDetail(res.data);
      });
    } catch (error) {
      setIsLoading(false);

      console.error(error);
    }
  };

  useEffect(() => {
    isShowUserDetails && getProfile();
  }, [isShowUserDetails]);

  const {
    avatar,
    birthDate,
    confirmationDate,
    designation,
    email,
    realName,
    joiningDate,
  } = userDetail;
  return (
    <Modal
      opened={isShowUserDetails}
      onClose={() => setIsShowUserDetails(false)}
      centered
      radius="lg"
      withCloseButton={false}
      sx={{
        display: `${isLoading ? "flex" : "unset"}`,
        justifyContent: `${isLoading && "center"}`,
      }}
    >
      {isLoading && (
        <Flex sx={{ height: "350px" }} justify={"center"} align={"center"}>
          <Loader variant="oval" />{" "}
        </Flex>
      )}

      {!isLoading && !isEmpty(userDetail) && (
        <Paper radius="lg">
          <Text align="center" fw={600} size={22}>
            Profile
          </Text>

          <Divider my="sm" variant="dotted" />

          <Flex justify={"space-between"}>
            <Flex direction="column">
              <Text mb={4} fw={600}>
                {realName}
              </Text>
              <Text mb={4} fw={500} size={14} color="#B5B5C3">
                {designation ? designation : "Team Member"}
              </Text>
              <Text fw={500} color="#B5B5C3" size={14}>
                {email}
              </Text>
            </Flex>

            <Flex>
              <Image maw={75} radius="md" src={avatar ?? avatar} alt={avatar} />
            </Flex>
          </Flex>

          <Divider my="sm" variant="dotted" />

          <Text mb={4} fw={500}>
            Born Day:{" "}
            <span style={{ fontWeight: "300" }}>
              {" "}
              {birthDate === null ? "---" : dateFormate(birthDate)}
            </span>
          </Text>

          <Text mb={4} fw={500}>
            Joining Date:{" "}
            <span style={{ fontWeight: "300" }}>
              {joiningDate === null ? "---" : dateFormate(joiningDate)}
            </span>
          </Text>
          <Text fw={500}>
            Confirm Date:{" "}
            <span style={{ fontWeight: "300" }}>
              {confirmationDate === null
                ? "---"
                : dateFormate(confirmationDate)}
            </span>
          </Text>

          <Divider my="sm" variant="dotted" />

          <Text c="dimmed" size={12}>
            Do you have something to doubt in your profile? Please contact to
            HR.
          </Text>

          <Divider my="sm" variant="dotted" />

          <Flex align={"center"} justify={"end"} mt={25}>
            <Button
              variant="outline"
              onClick={() => setIsShowUserDetails(false)}
            >
              Close
            </Button>
          </Flex>
        </Paper>
      )}
    </Modal>
  );
};

export default UserInfoPopup;
