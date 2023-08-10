import * as actionTypes from 'store/action-types';
import { AuthState, Action } from 'shared/interface';
import authService from 'shared/services/auth.service';

const initialState: AuthState = {
	isLoggedIn: authService.checkLogin(),
	...authService.getAuthData(),
	selectedOrg: authService.getSelectedOrg()
};

const reducer = (state: AuthState = initialState, action: Action): AuthState => {
	switch (action.type) {
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				...action.payload,
				isLoggedIn: true
			};
		case actionTypes.AUTH_LOGOUT_SUCCESS:
			authService.removeAuthData();
			return {
				...state,
				isLoggedIn: false
			};

		case actionTypes.SET_SELECTED_ORGANIZATION:
			return {
				...state,
				selectedOrg: action.payload
			};
		// case actionTypes.GET_PROFILE_SUCCESS:
		//   return {
		//     ...state,
		//     userData: action.payload,
		//   };
		// case actionTypes.CHANGE_PASSWORD_SUCCESS:
		//   return {
		//     ...state,
		//     closeModal: true,
		//   };
		// case actionTypes.RESET_PASSWORD_SUCCESS:
		//   return {
		//     ...state,
		//     closeModal: true,
		//   };
		// case actionTypes.UPDATE_PROFILE_SUCCESS:
		// 	return {
		// 		...state,
		// 		userData: {
		// 			...state.userData,
		// 			user: {
		// 				...state.userData.user,
		// 				name: action.payload.name,
		// 				email: action.payload.email,
		// 				language: action.payload.language,
		// 			}
		// 		},
		// 		closeModal: true
		// 	};
		// case "RESET_MODAL":
		//   return {
		//     ...state,
		//     closeModal: false,
		//   };
		default:
			return state;
	}
};
export default reducer;
