import { Anchor, Text, Tooltip } from "@mantine/core";
import {
  capitalizeFirstLetter,
  dateFormate,
  getDay,
} from "shared/util/utility";

export const getLeaveColumns = (id) => {
  return [
    {
      accessor: "date",
      title: "Date",
      width: 100,
      render: ({ date, isUpcomingLeave }) => {
        return (
          <Anchor
            sx={{ fontWeight: 500, color: `${isUpcomingLeave && "red"}` }}
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
      render: ({ date, isUpcomingLeave }) => {
        return (
          <Text sx={{ color: `${isUpcomingLeave && "red"}` }}>
            {getDay(date)}
          </Text>
        );
      },
    },
    {
      accessor: "reason",
      title: "Reason",
      width: 150,
      render: ({ reason, isUpcomingLeave }) => {
        return (
          <Tooltip
            sx={{
              maxWidth: "220px",
              wordWrap: "break-word",
              textWrap: "balance",
              height: "auto",
              textAlign: "center",
            }}
            width={"auto"}
            inline
            position="top-start"
            label={reason}
            color="#1c7ed6"
            transitionProps={{
              transition: "slide-down",
              duration: 300,
            }}
          >
            <Text truncate sx={{ color: `${isUpcomingLeave && "red"}` }}>
              {reason}
            </Text>
          </Tooltip>
        );
      },
    },

    {
      accessor: "leaveType",
      title: "Leave Type",
      width: 100,
      render: ({ leaveType, isUpcomingLeave }) => {
        return (
          <Text
            color={
              isUpcomingLeave
                ? "red"
                : leaveType === "Paid"
                ? "#40c057"
                : leaveType === "Vacational"
                ? "#228be6"
                : "#fa5252"
            }
            fw={700}
          >
            {leaveType}
          </Text>
        );
      },
    },
    {
      accessor: "duration",
      title: "Duration",
      width: 100,
      render: ({ duration, isUpcomingLeave }) => {
        return (
          <Text
            color={
              isUpcomingLeave
                ? "red"
                : capitalizeFirstLetter(duration) === "Full"
                ? "#228be6"
                : "#FF9B38"
            }
            fw={700}
          >
            {capitalizeFirstLetter(duration)}
          </Text>
        );
      },
    },
    {
      accessor: "status",
      title: "Status",
      width: 100,
      render: ({ status, isUpcomingLeave }) => {
        return (
          <Text color={isUpcomingLeave ? "red" : STATUS[status]} fw={700}>
            {status}
          </Text>
        );
      },
    },
    {
      accessor: "actionBy",
      title: "Action By",
      width: 120,
      render: ({ status, isUpcomingLeave, actionBy }) => {
        return (
          <Text color={isUpcomingLeave ? "red" : STATUS[status]} fw={700}>
            {actionBy}
          </Text>
        );
      },
    },
  ];
};

export const STATUS_DATA: any = [
  {
    label: "ALL",
    value: "",
  },
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Approved",
    value: "Approved",
  },
  {
    label: "Rejected",
    value: "Rejected",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
];

export const STATUS = {
  Approved: "#40c057",
  Pending: "#ffb703",
  Cancelled: "#fa5252",
  Rejected: "#FF9B38",
};
