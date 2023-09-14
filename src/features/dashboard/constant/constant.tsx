export const LEAVE_DETAILS = (leaveDetails) => {
  return [
    {
      label: "Paid Leave",
      value: leaveDetails.usedLeaves + " / " + leaveDetails.grantedLeaves,
      color: "#40c057",
    },
    {
      label: "Remaining",
      value: leaveDetails.remainingLeaves,
      color: "#40c057",
    },
    {
      label: "Vacational",
      value:
        leaveDetails.usedVacationalLeave + " / " + leaveDetails.vacationLeaves,
      color: "#228be6",
    },
    {
      label: "Compensation",
      value: leaveDetails.compensationLeaves,
      color: "#FF9B38",
    },
  ];
};
