import { lazy } from "react";

const User = lazy(() => import("features/User/component/user"));
const ViewUser = lazy(() => import("features/User/component/viewUser"));

export { User, ViewUser };
