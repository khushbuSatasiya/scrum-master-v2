import { Anchor, Flex, Image, Space, Text } from "@mantine/core";
import {
  capitalizeFirstLetter,
  dateFormate,
  getDay,
} from "shared/util/utility";

export const getLeaveColumns = (id) => {
  return [
    {
      accessor: "name",
      title: "Name",
      width: 180,
      render: ({ avatar, name, designation }) => {
        return (
          <Flex align="center">
            <Image
              width={40}
              height={40}
              fit="contain"
              radius="md"
              src={avatar}
              alt={name}
            />
            <Space w="md" />
            <Flex direction="column">
              <Text>{name}</Text>
              <Text fz="xs" c="dimmed">
                {designation}
              </Text>
            </Flex>
          </Flex>
        );
      },
    },
    {
      accessor: "date",
      title: "Date",
      width: 100,
      render: ({ date }) => {
        return (
          <>
            <Anchor sx={{ fontWeight: 500 }}>{dateFormate(date)}</Anchor>
            <Text>{getDay(date)}</Text>
          </>
        );
      },
    },
    {
      accessor: "reason",
      title: "Reason",
      width: 180,
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
      accessor: "totalDay",
      title: "Total Day",
      width: 80,
      render: ({ totalDay }) => {
        return (
          <Text color={totalDay === 1 ? "#228be6" : "#FF9B38"} fw={700}>
            {totalDay}
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
    label: "APPROVED",
    value: "Approved",
  },
  {
    label: "PENDING",
    value: "Pending",
  },
  {
    label: "CANCELLED",
    value: "Cancelled",
  },
  {
    label: "REJECTED",
    value: "Rejected",
  },
];

export const STATUS = {
  Approved: "#40c057",
  Pending: "#ffb703",
  Cancelled: "#fa5252",
  Rejected: "#FF9B38",
};
