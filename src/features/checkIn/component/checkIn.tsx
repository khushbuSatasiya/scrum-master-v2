import React, { FC, useCallback, useEffect, useState } from "react";

import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Paper,
  Select,
  Textarea,
  Divider,
  createStyles,
  Modal,
  Text,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { IconAlertTriangle, IconPlus, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

import { getProjectList } from "shared/util/utility";
import { checkInValidationSchema } from "shared/constants/validation-schema";
import { API_CONFIG } from "shared/constants/api";
import httpService from "shared/services/http.service";

import { IProjectArray } from "features/dashboard/interface/dashboard";

import CheckInForm from "./checkInForm";
import CheckInModal from "./checkInModal";

interface IProps {
  projectArray: IProjectArray[];
  checkStatus: () => void;
  currentTime: string;
}

const CheckIn: FC<IProps> = ({ projectArray, checkStatus, currentTime }) => {
  const [projectName, setProjectName] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [checkInValue, setCheckInValue] = useState(false);
  const [isAlreadyCheckIn, setIsAlreadyCheckIn] = useState(false);

  const useStyles = createStyles(() => ({
    input: {
      backgroundColor: "#f5f8fa",
      color: "#5e6278 ",
      fontWight: " 500 ",
      border: " none ",
    },
  }));

  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      time: currentTime,
      employees: [
        {
          task: "",
          project: "",
        },
      ],
    },
    validate: yupResolver(checkInValidationSchema),
    validateInputOnBlur: true,
  });

  const getProject = useCallback(() => {
    setProjectName(getProjectList(projectArray));
  }, [projectArray]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  const handleCheckIn = useCallback(async (values: any) => {
    const isEmptyOrNot = values.employees.map((data, index) => {
      const isCheck =
        (data.project === "" && data.task === "") ||
        (data.project !== "" && data.task === "") ||
        (data.task !== "" && data.project === "");
      return isCheck;
    });

    if (values.employees.length === 1 && isEmptyOrNot[0]) {
      setIsConfirm(true);
      setCheckInValue(values);
    } else {
      confirmCheckIn(values);
    }
  }, []);

  const confirmCheckIn = useCallback(
    async (values) => {
      const updatedValue = values.employees.map((data: any, index: number) => {
        return {
          projectId: data.project,
          taskName: data.task,
        };
      });

      const payload = {
        inTime: values.time,
        tasks: updatedValue,
      };

      setIsLoading(true);

      try {
        await httpService
          .post(API_CONFIG.path.checkIn, payload)
          .then((res: any) => {
            setIsLoading(false);
            notifications.show({
              message: res.message,
              styles: (theme) => ({
                root: {
                  backgroundColor: theme.colors.blue[6],
                  borderColor: theme.colors.blue[6],

                  "&::before": {
                    backgroundColor: theme.white,
                  },
                },

                title: { color: theme.white },
                description: { color: theme.white },
                closeButton: {
                  color: theme.white,
                  "&:hover": {
                    backgroundColor: theme.colors.blue[7],
                  },
                },
              }),
            });
            checkStatus();
          });
      } catch (error) {
        setIsLoading(false);
        if (error?.response?.status === 409) {
          setIsAlreadyCheckIn(true);
        }
        console.error(error);
      }
    },
    [checkStatus]
  );

  const isAddButtonDisabled = (employee: any) => {
    return (
      employee.task.trim() === "" ||
      employee.project === "" ||
      (employee.task.trim() === "" && employee.project === "")
    );
  };

  const fields = form.values.employees.map((item, index) => (
    <Paper key={index}>
      <Group mt="xs" sx={{ alignItems: "end" }}>
        <Select
          clearable
          searchable
          placeholder="Project names"
          nothingFound="No options"
          dropdownPosition="bottom"
          data={projectName}
          {...form.getInputProps(`employees.${index}.project`)}
          sx={{
            width: "40%",
            border: "none",
          }}
          classNames={{
            input: classes.input,
          }}
        />
        <Flex align={"center"}>
          <Textarea
            autosize
            placeholder={`- task 1\n- task 2`}
            minRows={2}
            sx={{ width: "730px" }}
            {...form.getInputProps(`employees.${index}.task`)}
            onKeyDown={(event) => {
              if (
                event.key === " " &&
                event.currentTarget.selectionStart === 0
              ) {
                event.preventDefault();
              }
            }}
            classNames={{
              input: classes.input,
            }}
          />

          {index === form.values.employees.length - 1 && (
            <Group position="center">
              <Button
                ml={15}
                sx={{
                  width: "35px",
                  height: "35px",
                  padding: "0",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  form.insertListItem("employees", {
                    task: "",
                    project: "",
                  });
                }}
                disabled={isAddButtonDisabled(form.values.employees[index])}
              >
                <IconPlus size="1.5rem" stroke={"3px"} />
              </Button>
            </Group>
          )}
          {form.values.employees.length !== 1 && (
            <ActionIcon
              color="red"
              ml={15}
              onClick={() => {
                form.removeListItem("employees", index);
              }}
            >
              <IconTrash size="1.5rem" color="black" />
            </ActionIcon>
          )}
        </Flex>
      </Group>

      <Divider my="lg" variant="dashed" />
    </Paper>
  ));

  const handleTimeChange = (e) => {
    let formattedTime = e.target.value.replace(/\D/g, "");
    if (formattedTime.length > 2) {
      formattedTime = `${formattedTime.slice(0, 2)}:${formattedTime.slice(2)}`;
    }
    if (formattedTime.length > 5) {
      return;
    }
    form.setFieldValue("time", formattedTime);
  };

  return (
    <>
      <Flex direction="column" justify="center" mt={30}>
        <CheckInForm
          form={form}
          handleCheckIn={handleCheckIn}
          fields={fields}
          handleTimeChange={handleTimeChange}
          isLoading={isLoading}
          classes={classes}
        />
      </Flex>

      <CheckInModal
        isConfirm={isConfirm}
        setIsConfirm={setIsConfirm}
        confirmCheckIn={confirmCheckIn}
        isAlreadyCheckIn={isAlreadyCheckIn}
        setIsAlreadyCheckIn={setIsAlreadyCheckIn}
        checkStatus={checkStatus}
        checkInValue={checkInValue}
      />
    </>
  );
};

export default CheckIn;
