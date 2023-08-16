import queryString from "query-string";
import isEmpty from "lodash/isEmpty";
import { QueryParameters } from "shared/interface";

export const API_CONFIG = {
  baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  //   authBaseUrl: `${process.env.REACT_APP_AUTH_BASE_URL}`,
  path: {
    login: "auth/login",
    getUserDetails: "web/userDetails",
    checkIn: "web/checkIn",
    getTimeSheet: "timesheet",
    leaveList: "leave/list",
    leaveExcel: "leave/excel",
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
