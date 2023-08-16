// import { UserProfileResponse } from "features/login/interface/login.interface";
// import { IBreadcrumbs } from "store/breadcrumbs.action";

// import { UserData } from 'features/login/interface/login.interface';

// export interface IBreadcrumbState {
//   breadcrumbs: IBreadcrumbs[];
//   title: string;
//   actionButton?: string;
//   handleModel?: (e: any) => void;
// }

// export interface AuthState extends UserData {
//   isLoggedIn: boolean;
//   selectedOrg: { label: string; value: string } | null;
// }

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

// export interface TableColumn {
//   key?: string;
//   sortable: boolean;
//   searchable: boolean;
//   heading: string;
//   className?: string;
// }

export interface State {
  //   auth: AuthState;
  loading: LoadingState;
  userDetails: IUserDetails;
  // breadcrumbs: IBreadcrumbState;
  // user: User;
  // payouts: Payouts;
  // deposit: Deposit;
  // game: Game;
  // battels: Battels;
  // transaction: Transaction;
  // leaderBoard: LeaderBoard;
  // adminRole: AdminRole;
  // adminUser: AdminUser;
  // kyc: KYC;
  // hackHistory: HackHistory;
}

export interface IUserDetails {
  avtar: string;
  bio: string;
  email: string;
  joiningDate: string;
  realName: string;
}

export interface Action {
  type: string;
  payload: any;
}
