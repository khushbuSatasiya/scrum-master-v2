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
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";

import { getProjectList } from "shared/util/utility";
import { checkInValidationSchema } from "shared/constants/validation-schema";
import { API_CONFIG } from "shared/constants/api";
import httpService from "shared/services/http.service";
import { SuccessNotification } from "shared/components/notification/notification";

import { IProjectArray } from "features/dashboard/interface/dashboard";

import CheckInForm from "./checkInForm";
import CheckInModal from "./checkInModal";

import { ICheckInValues, IProject } from "../interface/checkIn";

interface IProps {
  projectArray: IProjectArray[];
  checkStatus: () => void;
  currentTime: string;
}

const CheckIn: FC<IProps> = ({ projectArray, checkStatus, currentTime }) => {
  const [projectName, setProjectName] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [checkInValue, setCheckInValue] = useState<ICheckInValues>(
    {} as ICheckInValues
  );
  const [isAlreadyCheckIn, setIsAlreadyCheckIn] = useState(false);

  const useStyles = createStyles(() => ({
    input: {
      backgroundColor: "#f5f8fa",
      color: "black ",
      fontWight: " 500 ",
      border: "none ",
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

  const handleCheckIn = useCallback(async (values) => {
    const project = values.employees.filter((e) => e.project && e.task);

    if (!project.length) {
      setIsConfirm(true);
      setCheckInValue(values);
    } else {
      confirmCheckIn(values);
    }
  }, []);

  const confirmCheckIn = useCallback(
    async (values: ICheckInValues) => {
      const updatedValue = values.employees.map((data) => {
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
            SuccessNotification(res);
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
            color: "black",
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
            sx={{ width: "730px", color: "black" }}
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
          isConfirm={isConfirm}
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
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
};

export default CheckIn;
