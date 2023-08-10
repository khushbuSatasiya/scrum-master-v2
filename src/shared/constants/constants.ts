const firstLevelBreadcrumbs = [{ name: "Home", link: "/" }];

const pageOptions: number[] = [20, 50, 100];

const PER_PAGE = 20;

const DeadLine = {
  WORKING_HOURS: "9:00",
  CHECK_IN: "10:15:00",
  CHECK_OUT: "19:30:00",
};

const STATUS = {
  APPROVED: "Approved",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
};

export { firstLevelBreadcrumbs, pageOptions, PER_PAGE, DeadLine, STATUS };
