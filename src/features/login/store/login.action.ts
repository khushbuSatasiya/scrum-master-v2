import { ThunkDispatch } from 'redux-thunk';

import * as actionTypes from 'store/action-types';
import HttpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { createAction } from 'shared/util/utility';
import { Action } from 'shared/interface';
import { LoginResponse, UserLoginData } from '../interface/login.interface';

const login = (data: UserLoginData) => {
	return async (dispatch: ThunkDispatch<Record<string, unknown>, Record<string, unknown>, Action>) => {
		dispatch(createAction(actionTypes.AUTH_INIT));
		HttpService.post(API_CONFIG.path.login, data, {}, { isAccessTokenRequire: false })
			.then((response: LoginResponse) => {
				// AuthService.setAuthData(response);
				// localStorage.setItem('userId', data.userId);
				dispatch(createAction(actionTypes.AUTH_SUCCESS, response));
			})
			.catch(() => {
				dispatch(createAction(actionTypes.AUTH_FAIL));
			});
	};
};

// const getProfile = () => {
// 	return (dispatch: ThunkDispatch<Record<string, unknown>, Record<string, unknown>, Action>) => {
// 		dispatch(createAction(actionTypes.GET_PROFILE_INIT));
// 		HttpService.get(API_CONFIG.path.profile)
// 			.then((profileResponse: UserProfileResponse) => {
// 				AuthService.setUserData(profileResponse);
// 				dispatch(createAction(actionTypes.GET_PROFILE_SUCCESS, profileResponse));
// 			})
// 			.catch(() => {
// 				dispatch(createAction(actionTypes.GET_PROFILE_FAIL));
// 			});
// 	};
// };

// const changePassword = (passwords: ChangePasswordParams) => {
//   return (
//     dispatch: ThunkDispatch<
//       Record<string, unknown>,
//       Record<string, unknown>,
//       Action
//     >
//   ) => {
//     dispatch(createAction(actionTypes.CHANGE_PASSWORD_INIT));
//     HttpService.post(API_CONFIG.path.changePassword, passwords)
//       .then(() => {
//         dispatch(createAction(actionTypes.CHANGE_PASSWORD_SUCCESS));
//         dispatch(createAction("RESET_MODAL"));
//       })
//       .catch(() => {
//         dispatch(createAction(actionTypes.CHANGE_PASSWORD_FAIL));
//       });
//   };
// };

const logout = () => {
	return (dispatch: ThunkDispatch<Record<string, unknown>, Record<string, unknown>, Action>) => {
		HttpService.get(API_CONFIG.path.logout)
			.then(() => {				
				dispatch(createAction(actionTypes.AUTH_LOGOUT_SUCCESS));
				
			})
			.catch(() => {
				dispatch(createAction(actionTypes.AUTH_LOGOUT_FAIL));
			});
	};
};

export {
	login,
	logout
	// getProfile,
	//   changePassword,
};
