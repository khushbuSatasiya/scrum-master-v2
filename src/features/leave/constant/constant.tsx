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
      render: ({ date }) => {
        return <Anchor sx={{ fontWeight: 500 }}>{dateFormate(date)}</Anchor>;
      },
    },
    {
      accessor: "day",
      title: "Day",
      width: 100,
      render: ({ date }) => {
        return <Text>{getDay(date)}</Text>;
      },
    },
    {
      accessor: "reason",
      title: "Reason",
      width: 150,
      render: ({ reason }) => {
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
            <Text truncate>{reason}</Text>
          </Tooltip>
        );
      },
    },

    {
      accessor: "leaveType",
      title: "Leave Type",
      width: 100,
      render: ({ leaveType }) => {
        return (
          <Text
            color={
              leaveType === "Paid"
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
      render: ({ duration }) => {
        return (
          <Text
            color={
              capitalizeFirstLetter(duration) === "Full" ? "#228be6" : "#FF9B38"
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
      render: ({ status }) => {
        return (
          <Text color={STATUS[status]} fw={700}>
            {status}
          </Text>
        );
      },
    },
    {
      accessor: "actionBy",
      title: "Action By",
      width: 120,
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
