import { Anchor, Text, createStyles } from "@mantine/core";

import { DeadLine } from "shared/constants/constants";
import {
  dateFormate,
  getCheckInColor,
  getTotalWorkingHourColor,
} from "shared/util/utility";

export const getUserTimeSheetColumns = (renderModal) => {
  return [
    {
      accessor: "date",
      title: "Date",
      width: 100,
      render: ({ date }) => {
        return (
          <Anchor
            sx={{
              fontWeight: 500,
              cursor: "unset",
              textDecoration: "none !important",
              "&:hover": { textDecoration: "none !important" },
            }}
          >
            {dateFormate(date)}
          </Anchor>
        );
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
      accessor: "inTime",
      title: "In",
      width: 120,
      render: ({ inTime, leave, isHalfLeave }) => {
        return (
          <Text
            truncate
            color={`${
              inTime && isHalfLeave
                ? "green"
                : getCheckInColor(inTime, DeadLine.CHECK_IN)
            }`}
            fw={700}
          >
            {inTime ? inTime : leave || <Text color="red">-</Text>}
          </Text>
        );
      },
    },
    {
      accessor: "outTime",
      title: "Out",
      width: 120,
      render: ({ outTime, remarks, isHalfLeave }) => {
        return (
          <Text color={`${outTime ? "green" : "red"}`} fw={700}>
            {outTime ? outTime : remarks || <Text color="red">-</Text>}
          </Text>
        );
      },
    },
    {
      accessor: "totalHour",
      title: "Total Hour",
      width: 120,
      render: ({ totalHour, isHalfLeave }) => {
        return (
          <Text
            color={isHalfLeave ? "green" : getTotalWorkingHourColor(totalHour)}
            fw={700}
          >
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
