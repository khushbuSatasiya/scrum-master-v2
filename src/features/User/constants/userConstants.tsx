import { Anchor, Badge, Flex, Image, Space, Text } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import { dateFormate, getTextColor } from "shared/util/utility";

export const getUserColumns = (renderActionsColumn): DataTableColumn<any>[] => {
  return [
    // {
    // 	accessor: 'index',
    // 	title: '#',
    // 	textAlignment: 'right',
    // 	width: 40,
    // 	render: (record) => {
    // 		const startingIndex =
    // 			getStartingIndex(pagination.recordPerPage, pagination.currentPage) +
    // 			userData.indexOf(record as never) +
    // 			1;
    // 		return `${startingIndex < 10 ? '0' : ''}${startingIndex}`;
    // 	}
    // },
    {
      accessor: "realName",
      title: "Name",
      width: 300,
      render: ({ avatar, realName, designation }) => (
        <div>
          <Flex align="center">
            <Image
              width={40}
              height={40}
              fit="contain"
              radius="md"
              src={avatar}
              alt={realName}
            />
            <Space w="md" />
            <Flex direction="column">
              <Text>{realName}</Text>
              <Text fz="xs" c="dimmed">
                {designation}
              </Text>
            </Flex>
          </Flex>
        </div>
      ),
    },

    {
      accessor: "email",
      title: "Email",
      width: 300,
      render: ({ email }) => {
        return <Anchor sx={{ fontWeight: 500 }}>{email}</Anchor>;
      },
    },
    //{
    //	accessor: 'birthDate',
    //	textAlignment: 'center',
    //	title: 'Birth Date',
    //	width: 350,
    //	render: ({ birthDate }) => dateFormate(birthDate)
    //},
    {
      accessor: "joiningDate",
      title: "Joining Date",
      width: 150,
      render: ({ joiningDate }) => dateFormate(joiningDate),
    },
    {
      accessor: "userLeaveBalance",
      title: "Leave",
      width: 100,
      render: ({ userLeaveBalance }) => {
        return (
          <Text fw={700} color={getTextColor(userLeaveBalance, [0, 9])}>
            {userLeaveBalance}
          </Text>
        );
      },
    },
    {
      accessor: "vacationalLeave",
      title: "Vacation Leave",
      width: 150,
      render: ({ vacationalLeave }) => {
        return (
          <Text fw={700} color={getTextColor(vacationalLeave, [0, 3])}>
            {vacationalLeave}
          </Text>
        );
      },
    },
    {
      accessor: "isActive",
      title: "Active",
      width: 80,
      render: ({ isActive }) => {
        return (
          <Badge radius="sm" color={`${isActive === "Yes" ? "green" : "red"}`}>
            {isActive}
          </Badge>
        );
      },
    },
    {
      accessor: "actions",
      width: 120,
      title: <Text mr="xs">Actions</Text>,
      textAlignment: "center",
      render: renderActionsColumn,
    },
  ];
};

export const DATE_PICKER_FIELDS = [
  {
    label: "Birth Date",
    name: "birthDate",
    placeholder: "Birth Date",
  },
  {
    label: "Joining Date",
    name: "joiningDate",
    placeholder: "Joining Date",
  },
  {
    label: "Confirmation Date",
    name: "confirmationDate",
    placeholder: "Confirmation Date",
  },
  {
    label: "Probation Completion Date",
    name: "probationCompletionDate",
    placeholder: "Probation Completion Date",
  },
  {
    label: "Paid Leave Start Date",
    name: "paidLeaveStartDate",
    placeholder: "Paid Leave Start Date",
  },
];

export const LEAVE_FIELDS = [
  {
    label: "User Leave Balance",
    name: "userLeaveBalance",
    placeholder: "User Leave Balance",
  },
  {
    label: "Vacational Leave",
    name: "vacationalLeave",
    placeholder: "Vacational Leave",
  },
];

export const USERINFO = {
  id: "",
  realName: "",
  designation: "",
  avatar: "",
  email: "",
  projectCount: 0,
  experience: 0,
};

export const LEAVE_DETAILS = (LeaveDetails: any) => {
  return [
    {
      label: "Remaining Leave",
      value: LeaveDetails.remainingLeaves,
      color: "#40c057",
    },
    {
      label: "Compensation Leave",
      value: LeaveDetails.compensationLeaves,
      color: "#228be6",
    },
    {
      label: "Used Leave",
      value: LeaveDetails.usedLeaves,
      color: "#fa5252",
    },
    {
      label: "Vacation Leave",
      value: LeaveDetails.vacationLeaves,
      color: "#228be6",
    },
    {
      label: "Granted Leave",
      value: LeaveDetails.grantedLeaves,
      color: "#40c057",
    },
  ];
};

export const USER_INFO_ARR = [
  {
    label: "Overview",
    value: "overview",
    content: "Gallery tab content",
  },
  {
    label: "Projects",
    value: "projects",
    content: "Project tab content",
  },
  {
    label: "Time Sheet",
    value: "timesheet",
  },
  {
    label: "Leave Report",
    value: "leavereport",
  },
];
