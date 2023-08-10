import queryString from "query-string";
import isEmpty from "lodash/isEmpty";
import { QueryParameters } from "shared/interface";
import store from "store";

export const API_CONFIG = {
  baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  //   authBaseUrl: `${process.env.REACT_APP_AUTH_BASE_URL}`,
  path: {
    login: "login",
    getUserDetails: "web/userDetails",
  },
};

export const getUrl = (url: string, params: QueryParameters = {}): string => {
  const state = store.getState();
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
