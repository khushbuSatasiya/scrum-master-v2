import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosResponse, AxiosError } from 'axios';
import { Notification } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';

import { axiosInstance } from 'shared/services/http.service';
import { createAction } from 'shared/util/utility';
import { IResponseObject } from 'shared/interface';

const ErrorHandler: FC = () => {
	const dispatch = useDispatch();

	const logout = useCallback(() => {
		// dispatch(createAction(actionTypes.LOGOUT_SUCCESS));
		dispatch(createAction('RESET_MODAL'));
	}, [dispatch]);

	useEffect(() => {
		const resInterceptor = axiosInstance.interceptors.response.use(
			(res: AxiosResponse<IResponseObject<any>>) => {
				const data = res.data;
				if (data && data.message) {
					if (data.isError) {
						notifications.show({
							message: data.message,
							color: 'red'
						});
						throw new Error(data.message as string);
					} /* else {
						notify(data.message, 'success');
					} */
				}

				return res;
			},
			(error: AxiosError<IResponseObject<any>>) => {
				console.log('error', error);
				const res = error.response;
				// check if error is having data
				if (res && res.data && res.status) {
					const status = res.status;
					const responseData = res.data;

					// is http error code is 401, log out of the application
					if (status === 401 && responseData) {
						//logout();
						notifications.show({
							message: error.message,
							color: 'red'
						});
					} else if (res && responseData && responseData.message) {
						// if error data contains message field, add error notification
						notifications.show({
							message: responseData.message,
							color: 'red'
						});
					} else {
						notifications.show({
							message: error.message,
							color: 'red'
						});
					}
					throw error;
				}
			}
		);

		return () => axiosInstance.interceptors.response.eject(resInterceptor);
	}, [logout]);

	return <Notifications />;
};

export default ErrorHandler;
