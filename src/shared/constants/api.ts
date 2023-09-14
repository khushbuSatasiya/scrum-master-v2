import queryString from "query-string";
import isEmpty from "lodash/isEmpty";
import { QueryParameters } from "shared/interface";

export const API_CONFIG = {
  baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  //   authBaseUrl: `${process.env.REACT_APP_AUTH_BASE_URL}`,
  path: {
    login: "auth/login",
    status: "web/status",
    getUserDetails: "web/userDetails",
    checkIn: "web/checkIn",
    getTimeSheet: "timesheet/list",
    timeSheetExcel: "timesheet/excel",
    leaveList: "leave/list",
    leaveExcel: "leave/excel",
    checkOut: "web/checkOut",
    projectList: "project/list",
    project: "project",
    profile: "users/profile",
	leaveRequest:'request/leave',
	changeTimeSheet:'request/changetime',
	timeSheet:'request/timesheet',
    teamReport: "web/report",
    projects: "project/dropdown",
    userList: "users/dropdown",
  },
};

export const getUrl = (url: string, params: QueryParameters = {}): string => {
  // const state = store.getState();
  const baseUrl = API_CONFIG.baseUrl;

  if (!url.includes("https")) {
    let urlString = `${baseUrl}/${url}`;
    if (params && !isEmpty(params)) {
      urlString += `?${queryString.stringify(params)}`;
    }
    return urlString;
  }
  return url;
};
