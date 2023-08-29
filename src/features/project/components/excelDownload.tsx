import React, { FC, useState, useEffect } from "react";
import fileSever from "file-saver";
import moment from "moment";
import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Select,
  Text,
  TextInput,
  createStyles,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { isEmpty } from "lodash";

import httpService from "shared/services/http.service";
import { API_CONFIG } from "shared/constants/api";

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
  const form = useForm({
    initialValues: {
      date: new Date(date),
      userId: isEmpty(teamInfo) ? "" : teamInfo,
    },
  });

  const useStyles = createStyles(() => ({
    header:{
      padding:'0px'
    },
    content:{
      overflowY:'unset',
      padding:'5px'
    },
    close:{
      marginTop:'5px',
      marginRight:'5px'
    }
   
  }));

  const { classes } = useStyles();

  const handleSubmit = (values: FormValues) => {
    const startDate= moment(values.date).startOf("month").format("YYYY-MM-DD")
    const endDate =  moment(values.date).endOf("month").format("YYYY-MM-DD");
  
    const params = {
      projectId: projectId,
      startDate: startDate,
      endDate: endDate,
      userId: values.userId,
    };

    httpService
      .get(`${API_CONFIG.path.project}/excel`, params, {
        responseType: "blob",
      })
      .then((res) => {
        const blob = new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        fileSever.saveAs(blob, `${moment(startDate).format('MMMM')}.xlsx`);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  useEffect(() => {
    let teamArray =
      teamDetails.length > 0 &&
      Object.values(teamDetails).map(({ realName, id }) => ({
        label: realName,
        value: id,
      }));
    setTeamInfo(teamArray as any);
  }, []);
  return (
  
      <Modal
      classNames={{header:classes.header,content:classes.content,close:classes.close}}
        shadow="sm"
        size={"450px"}
        pos={"relative"}
        centered
        padding={20}
        radius="lg"
        withCloseButton={true}
        opened={true}
        onClose={() => {
          setExcelData({});
        }}
      >
        <Box>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Text ta={"center"} fw={600} c={'#071437'} fz={22}>{projectName}</Text>
            <Divider  variant="dashed" mt={10} mb={10}/>

            <MonthPickerInput
            label={"Select Month"}
              size="sm"
              monthsListFormat="MMM"
              variant="filled"
              mt="15px"
              placeholder="Pick a month"
              radius="md"
              sx={{ border: "none !important" }}
              icon={<IconCalendar size={16} />}
              {...form.getInputProps("date")}
            />

            {!isEmpty(teamInfo) && (
              <Select
                label={"Select Employee"}
                placeholder="Select Employee"
                searchable
                data={teamInfo}
                variant="filled"
                mt="lg"
                radius="md"
                withinPortal
                transitionProps={{
                  transition: "pop-top-left",
                  duration: 80,
                  timingFunction: "ease",
                }}
                clearable
                autoFocus={false}
                {...form.getInputProps("teamMate")}
              />
            )}

            <Flex justify={"center"} mt={30} mb={10}>
              <Button type="submit">Excel Download</Button>
            </Flex>
          </form>
        </Box>
      </Modal>
    
  );
};

export default ExcelDownload;
