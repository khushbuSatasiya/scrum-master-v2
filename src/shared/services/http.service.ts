import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { getUrl } from "shared/constants/api";
import { ResponseObj } from "../interface";
import authService from "./auth.service";

const axiosInstance = axios.create();
const CancelToken = axios.CancelToken;
let cancel_req: any;

export { cancel_req };

export interface AxiosParams extends MiscellaneousRequestParams {
  method: string;
  url: string;
  data?: any;
  isAccessTokenRequire?: boolean;
  contentType?: string;
}

export interface MiscellaneousRequestParams {
  isAccessTokenRequire?: boolean;
  contentType?: string;
  responseType?: string;
}

/**
 * get method
 * @param request object containing axios params
 */
const get = (
  url: string,
  params: any = {},
  otherData: MiscellaneousRequestParams = {}
) => {
  return commonAxios({ method: "GET", url: getUrl(url, params), ...otherData });
};

/**
 * post method
 * @param request object containing axios params
 */
const post = (
  url: string,
  params: any = {},
  queryParams = {},
  otherData: MiscellaneousRequestParams = {}
) => {
  return commonAxios({
    method: "POST",
    url: getUrl(url, queryParams),
    data: params,
    ...otherData,
  });
};

/**
 * put method
 * @param request object containing axios params
 */
const put = (
  url: string,
  params: any = {},
  otherData: MiscellaneousRequestParams = {}
) => {
  return commonAxios({
    method: "PUT",
    url: getUrl(url),
    data: params,
    ...otherData,
  });
};

/**
 * deleteRequest method
 * @param request object containing axios params
 */
const deleteRequest = (
  url: string,
  params: any = {},
  otherData: MiscellaneousRequestParams = {}
) => {
  return commonAxios({
    method: "DELETE",
    url: getUrl(url),
    data: params,
    ...otherData,
  });
};

/**
 * patch method
 * @param request object containing axios params
 */
const patch = (
  url: string,
  params: any = {},
  otherData: MiscellaneousRequestParams = {}
) => {
  return commonAxios({
    method: "PATCH",
    url: getUrl(url),
    data: params,
    ...otherData,
  });
};

/**
 * commonAxios
 * @param object containing method, url, data, access token, content-type
 */
const commonAxios = ({
  method,
  url,
  data,
  isAccessTokenRequire = true,
  contentType = "application/json",
  responseType,
}: AxiosParams): Promise<any> => {
  const headers: any = {
    "Content-Type": contentType,
  };
  const token = isAccessTokenRequire && authService.getAccessToken();

  if (token) {
    headers["x-access-token"] = `${token}`;
    headers["organizationId"] = "0125f93d-12b5-4935-98e6-8d455fdf1793";
  } else {
    headers["x-request-language"] = localStorage.getItem("lang");
  }

  let body: any = null;
  if (contentType === "application/json") {
    body = JSON.stringify(data);
  } else {
    body = data;
  }
  return new Promise((resolve, reject) => {
    axiosInstance({
      method: method,
      url: url,
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel_req = c;
      }),
      responseType: responseType,
      headers: headers,
      data: body,
    } as AxiosRequestConfig)
      .then((response: AxiosResponse<ResponseObj<any>>) => {
        resolve(response.data);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
};

const getBlob = (url: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { responseType: "blob" })
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: Error) => reject(error));
  });
};

const httpService = {
  get: get,
  post: post,
  put: put,
  deleteRequest: deleteRequest,
  patch: patch,
  getBlob: getBlob,
};

export { axiosInstance };

export default httpService;
