import React, { FC, useCallback, useEffect, useState } from "react";

import moment from "moment";

import { MonthPickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { Box, Flex, Space } from "@mantine/core";

import { TableSelection } from "shared/components/table/container/table";
import { API_CONFIG } from "shared/constants/api";
import httpService from "shared/services/http.service";

import { getUserTimesheetColumns } from "../constant/constant";

interface IUserTimeSheetProps {
  handleTimeSheetDetails?: (workingHours) => void;
  uId: string;
}
const TimeSheet: FC<IUserTimeSheetProps> = ({
  handleTimeSheetDetails,
  uId,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState<Date | null>(null);
  const [timeSheetData, setTimeSheetData] = useState<[]>([]);

  /* API call for get user timesheet data */

  const getUerTimeSheet = useCallback(
    (date?: any) => {
      const params = {
        startDate: date
          ? moment(date).startOf("month").format("YYYY-DD-MM")
          : "",
        endDate: date ? moment(date).endOf("month").format("YYYY-DD-MM") : "",
      };
      setLoading(true);
      httpService
        .get(`${API_CONFIG.path.getTimeSheet}/${uId}`, params)
        .then((res) => {
          const workingHour = res.data.workingHours;
          setTimeSheetData(res.data.items);
          handleTimeSheetDetails(workingHour);

          setLoading(false);
        })
        .catch((err: Error) => {
          console.error("Error", err);
          setLoading(false);
        });
    },
    [uId]
  );

  /* API call for get user timesheet Excel */
  // const getTimeSheetExcel = useCallback(
  //   (date?) => {
  //     const params = {
  //       startDate: value
  //         ? moment(value).startOf("month").format("YYYY-DD-MM")
  //         : "",
  //       endDate: value ? moment(value).endOf("month").format("YYYY-DD-MM") : "",
  //     };

  //     httpService
  //       .get(`${API_CONFIG.path.excelTimeSheet}/${id}`, params, {
  //         responseType: "blob",
  //       })

  //       .then((res) => {
  //         const blob = new Blob([res], {
  //           type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //         });

  //         fileSever.saveAs(blob, "timesheet.xlsx");
  //       })
  //       .catch((err: Error) => {
  //         console.error("Error", err);
  //       });
  //   },
  //   [value]
  // );

  useEffect(() => {
    getUerTimeSheet();
  }, []);

  return (
    <Box>
      <Flex justify="space-between">
        <MonthPickerInput
          value={value}
          size="md"
          monthsListFormat="MMM"
          onChange={(date) => {
            getUerTimeSheet(date);
            //getTimeSheetExcel(date);
            setValue(date);
          }}
          maw={200}
          variant="filled"
          clearable
          placeholder="Pick a month"
          radius="md"
          ml="20px"
          icon={<IconCalendar size={16} />}
        />
        <Space w="20px" />
        {/* <Tooltip
          label="Download Excel"
          color="blue"
          position="bottom"
          withArrow
        >
          <ThemeIcon
            w={40}
            h={40}
            onClick={getTimeSheetExcel}
            variant="light"
            mr="40px"
            radius="md"
          >
            <IconDownload cursor="pointer" />
          </ThemeIcon>
        </Tooltip> */}
      </Flex>

      <Box ml="-20px">
        <TableSelection
          isLoading={isLoading}
          userList={timeSheetData}
          columns={getUserTimesheetColumns()}
        />
      </Box>
    </Box>
  );
};

export default TimeSheet;
