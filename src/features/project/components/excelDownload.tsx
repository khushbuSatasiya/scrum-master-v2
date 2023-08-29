import React, { FC, useState, useEffect } from "react";
import fileSever from "file-saver";
import moment from "moment";
import {
  Box,
  Button,
  Flex,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import {  MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { isEmpty } from "lodash";

import httpService from "shared/services/http.service";
import { API_CONFIG } from "shared/constants/api";
import { dateFormat } from "shared/util/utility";

import { IExcelProps } from "../interface/project";
interface IExcelDownloadProps {
  excelData: IExcelProps;
  setExcelData: (value) => void;
}
interface FormValues {
  projectName: string;
  date: Date;
  userId: string;
}
const ExcelDownload: FC<IExcelDownloadProps> = ({
  setExcelData,
  excelData,
}) => {
  const [teamInfo, setTeamInfo] = useState<
    {
      label: "";
      value: "";
    }[]
  >();


  const { date, projectName, teamDetails, projectId } = excelData;


  useEffect(() => {
    let teamArray = teamDetails.map(({ realName, id }) => ({
      label: realName,
      value: id,
    }));
    setTeamInfo(teamArray as any);
  }, []);

  const form = useForm({
    initialValues: {
      date: isEmpty(date) ? null : new Date(date),
      projectName: isEmpty(projectName) ? "" : projectName,
      userId: isEmpty(teamInfo) ? "" : teamInfo,
    },
    validate: {
      projectName: (value) =>
        value === "" ? "Project name is required" : null,
    },
  });

  const handleSubmit = (values: FormValues) => {
    const startDate = dateFormat(values.date);
    const endDate = dateFormat(values.date);

    const params = {
      projectId: projectId,
      startDate: startDate,
      endDate: endDate,
      userId: values.userId,
    };

    httpService
      .get(`${API_CONFIG.path.project}/excel`,params ,{
        responseType: 'blob',
    })
      .then((res) => {

        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      fileSever.saveAs(blob, `${new Date(startDate)}.xlsx`);
      ;
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  return (
    <Modal
      shadow="sm"

      pos={"relative"}
      centered
      padding={20}
      radius="lg"
      withCloseButton={false}
      opened={true}
      onClose={() => {
        setExcelData({});
      }}
    >
      <Box>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            variant="filled"
            mt="sm"
            placeholder="Project Name"
            label="Project Name"
            radius="md"
            disabled
            {...form.getInputProps("projectName")}
          />

         {!isEmpty(teamInfo) && teamInfo.length > 0 &&
            <Select
              label={"Select Employee"}
              searchable
              mt="lg"
              radius="md"
              data={teamInfo}
              placeholder="Select employee "
              transitionProps={{
                transition: "pop-top-left",
                duration: 80,
                timingFunction: "ease",
              }}
             withinPortal
               nothingFound='Nobody here'
              variant="filled"
              {...form.getInputProps("teamMate")}
            />}

       

          <MonthPickerInput
            size="sm"     
            monthsListFormat="MMM"
            variant="filled"
            clearable
            mt="35px"
            placeholder="Pick a month"
            radius="md"
            sx={{ border: "none !important" }}
            icon={<IconCalendar size={16} />}
            {...form.getInputProps("date")}
          />

         <Flex justify={'center'} mt={30} mb={10}>
         <Button type="submit" >
            Excel Download
          </Button>
         </Flex>
        </form>
      </Box>
    </Modal>
  );
};

export default ExcelDownload;
