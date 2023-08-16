import { Action, IUserDetails } from "shared/interface/state";
import * as actionTypes from "store/action-types";

const initialState: IUserDetails = {
  avtar: "",
  bio: "",
  email: "",
  joiningDate: "",
  realName: "",
};

const userDetails = (state: IUserDetails = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DETAILS:
      return {
        ...state,
        showScreen: action.payload,
      };

    default:
      return state;
  }
};

export default userDetails;
