export interface LoadingState {
  api: {
    [key: string]: boolean;
  };
}

export interface NotificationMsgState {
  message: string;
  type: string;
}

export interface LoaderState {
  loading: boolean;
}

export interface Pagination {
  page: number;
  lastPage?: number;
  recordPerPage: number;
  total?: number;
  orderBy?: string;
  sort?: string;
}

export interface SortingConfig {
  orderByColumn: string;
  orderBy: "asc" | "desc";
}

export interface State {
  loading: LoadingState;
  userDetails: IUserDetails;
  getMonth: IMonth;
}

export interface IUserDetails {
  avtar: string;
  bio: string;
  email: string;
  joiningDate: string;
  realName: string;
}

export interface IMonth {
  month: string;
}

export interface Action {
  type: string;
  payload: any;
}
