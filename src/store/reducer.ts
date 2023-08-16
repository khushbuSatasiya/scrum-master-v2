import { combineReducers } from "redux";
import { State, Action } from "shared/interface";
import * as actionTypes from "store/action-types";
import loadingReducer from "./loadingReducer";

import userDetails from "features/dashboard/store/reducer";

const appReducer = combineReducers({
  loading: loadingReducer,
  userDetails: userDetails,
});

const rootReducer = (state: State | undefined, action: Action): State => {
  if (
    action.type === actionTypes.AUTH_LOGOUT_SUCCESS ||
    action.type === actionTypes.AUTH_LOGOUT_FAIL
  ) {
    localStorage.removeItem("authData");
    localStorage.removeItem("userData");
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
