import { lazy } from "react";

const User = lazy(() => import("features/User/component/user"));
const ViewUser = lazy(() => import("features/User/component/viewUser"));
const Dashboard = lazy(() => import("features/dashboard/component/dashboard"));

export { User, ViewUser, Dashboard };
