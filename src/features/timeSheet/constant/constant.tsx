import { Anchor, Text, createStyles } from "@mantine/core";

import { DeadLine } from "shared/constants/constants";
import {
  dateFormate,
  getCheckInColor,
  getCheckOutColor,
  getTotalWorkingHourColor,
} from "shared/util/utility";

export const getUserTimesheetColumns = (renderModal) => {
  return [
    {
      accessor: "date",
      title: "Date",
      width: 100,
      render: ({ date }) => {
        return <Anchor sx={{ fontWeight: 500 }}>{dateFormate(date)}</Anchor>;
      },
    },
    {
      accessor: "day",
      title: "Day",
      width: 100,
      render: ({ day }) => {
        return <Text>{day}</Text>;
      },
    },
    {
      accessor: "leave",
      title: "Leave",
      width: 150,
      render: ({ leave }) => {
        return <Text color="red">{leave || "-"}</Text>;
      },
    },
    {
      accessor: "remarks",
      title: "Remarks",
      width: 150,
      render: ({ remarks }) => {
        return <Text color="red">{remarks || "-"}</Text>;
      },
    },
    {
      accessor: "inTime",
      title: "In",
      width: 120,
      render: ({ inTime }) => {
        return (
          <Text color={getCheckInColor(inTime, DeadLine.CHECK_IN)} fw={700}>
            {inTime || <Text color="red">-</Text>}
          </Text>
        );
      },
    },
    {
      accessor: "outTime",
      title: "Out",
      width: 120,
      render: ({ outTime }) => {
        return (
          <Text color={"green"} fw={700}>
            {outTime || <Text color="red">-</Text>}
          </Text>
        );
      },
    },
    {
      accessor: "totalHour",
      title: "Total Hour",
      width: 120,
      render: ({ totalHour }) => {
        return (
          <Text color={getTotalWorkingHourColor(totalHour)} fw={700}>
            {totalHour || <Text color="red">-</Text>}
          </Text>
        );
      },
    },
    {
      accessor: "tasks",
      title: "Tasks",
      width: 100,
      render: renderModal,
    },
  ];
};

/* css for modal */

const useStyles = createStyles(() => ({
  title: {
    color: "#228be6",
    fontSize: "14px",
    fontWeight: 700,
    background: "#E7F5FF",
    padding: "10px",
    borderRadius: "10px",
  },
  header: {
    padding: "16px",
  },
  close: {
    outline: "none",
  },
}));

export { useStyles };
