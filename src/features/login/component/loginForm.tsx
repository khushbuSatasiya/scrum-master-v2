import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Flex,
  LoadingOverlay,
  PasswordInput,
  PasswordInputProps,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import jwt from "jwt-decode";

import * as actionTypes from "store/action-types";
import { createAction } from "shared/util/utility";
import authService from "shared/services/auth.service";

import httpService from "shared/services/http.service";
import { API_CONFIG } from "shared/constants/api";
import { JwtTokenData, LoginResponse } from "../interface/login.interface";

import "../styles/login.scss";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = ({ ...others }: PasswordInputProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Please Enter email"),
      password: (value) => (value === "" ? "Passwords required" : null),
    },
  });

  /* API call for user login */
  const handleSubmit = (values: FormValues) => {
    setLoading(true);
    httpService
      .post(API_CONFIG.path.login, values)
      .then((res: LoginResponse) => {
        const authSelectedOrg = authService.getSelectedOrg();
        // decode jwt token
        const jwtTokenData = jwt(res.data.token) as JwtTokenData;

        let selectedOrg = null;
        // if (authSelectedOrg) {
        // 	// set selected-org if available in local storage
        // 	selectedOrg = authSelectedOrg;
        // } else if (jwtTokenData.organizations && jwtTokenData.organizations.length > 0) {
        // 	// set first value of the array as selected-org
        // 	const { name, id } = jwtTokenData.organizations[0];
        // 	selectedOrg = { label: name, value: id };
        // }

        // store all data like token and user data in one object
        const userData = { ...res.data, user: { ...jwtTokenData } };

        authService.setAuthData(userData);
        authService.setSelectedOrg(selectedOrg);

        // Set selected-org in redux
        dispatch(
          createAction(actionTypes.SET_SELECTED_ORGANIZATION, selectedOrg)
        );
        setLoading(false);
        notifications.show({
          message: res.message,
          color: "green",
        });
        navigate("/");
        dispatch(createAction(actionTypes.AUTH_SUCCESS, userData));
      })
      .catch((err: Error) => {
        console.log("err", err);
        setLoading(false);
        notifications.show({
          message: err.message,
          color: "red",
        });
      });
  };

  return (
    <Box pos={"relative"}>
      <LoadingOverlay
        loaderProps={{
          size: "xl",
        }}
        visible={loading}
        overlayBlur={2}
      />
      <Text size={30} ta="center" fw={700}>
        Admin Sign In
      </Text>

      <Space h={50} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          styles={{
            label: { fontSize: "14px" },
            error: { fontSize: "12px" },
          }}
          withAsterisk
          // label='Email'
          radius="md"
          size="md"
          placeholder="Email"
          sx={{ marginTop: "10px" }}
          {...form.getInputProps("email")}
        />

        <PasswordInput
          withAsterisk
          placeholder="Password"
          id="your-password"
          // label={'Password'}
          {...form.getInputProps("password")}
          style={{ marginTop: "30px" }}
          {...others}
          radius="md"
          size="md"
        />

        <Space h="sm" />
        <Link to={"/forgot-password"} style={{ textDecoration: "none" }}>
          <Text fw={500} fz="sm" ta="right" c="blue">
            Forgot Password ?
          </Text>
        </Link>

        <Space h={50} />
        <Button
          fullWidth
          radius="md"
          size="md"
          sx={{
            fontSize: "14px",
          }}
          variant="gradient"
          type="submit"
        >
          Sign In
        </Button>

        <Flex align="center" justify="center" mt={40}>
          <Text fz="sm" ta="center" c="dimmed">
            Not a Member yet? Contact
          </Text>
          <Text ml={6} c="blue">
            hr@scaletech.xyz
          </Text>
        </Flex>
      </form>
    </Box>
  );
};

export default Login;
