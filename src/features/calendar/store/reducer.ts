import { Action, IMonth } from "shared/interface/state";
import * as actionTypes from "store/action-types";

const initialState: IMonth = {
  month: "",
};

const getMonth = (state: IMonth = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_MONTH:
      return {
        ...state,
        month: action.payload,
      };

    default:
      return state;
  }
};

export default getMonth;
