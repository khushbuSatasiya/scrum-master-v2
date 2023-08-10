import moment, { Moment } from 'moment';
import findIndex from 'lodash/findIndex';

import { Action, State } from '../interface';
import { isArray, isNull } from 'lodash';
import { DeadLine } from 'shared/constants/constants';

export const createAction = (ACTION: string, data: any = null): Action => {
	return {
		type: ACTION,
		payload: data
	};
};

export const createLoadingSelector = (actions: string[]) => (state: State) => {
	// returns true only when all actions is not loading
	let loader = false;
	for (let i = 0; i < actions.length; i += 1) {
		if (state.loading.api[actions[i]]) {
			loader = true;
			break;
		}
	}
	return loader;
};

/**
 * function which returns formatted date
 * @param date
 */
export const formatDate = (date: any, format?: string) => {
	if (!date) {
		return '';
	}
	return moment(date)
		.local()
		.format(format || 'DD-MM-YYYY | HH:mm:ss');
};
/**
 * function to convert date to iso string and set seconds/milliseconds to zero
 * @param date
 */
export const convertDateToISOString = (date: any) => {
	if (!date) {
		return '';
	}
	return moment(date).set({ seconds: 0, milliseconds: 0 }).toISOString();
};

export const debounce = (func: any, wait = 400) => {
	let h: NodeJS.Timeout;
	return (...args: any) => {
		clearTimeout(h);
		h = setTimeout(() => func(...args), wait);
	};
};

const numberFormatterInstance = new Intl.NumberFormat('de-DE');

export const numberFormatter = (value: number) => {
	return numberFormatterInstance.format(value);
};

export const setFileInputValue = (
	event: React.ChangeEvent<HTMLInputElement>,
	callBack: (name: string, value: any) => void,
	key: string,
	values: any[] | Record<string, unknown>,
	types: string[]
) => {
	const files = event.target.files;
	if (!files || !files[0]) {
		return;
	}
	const fileList = Array.from(files);
	let data: any = {};
	if (isArray(values)) {
		data = values;
		if (!data) {
			data = [];
		}
		if (fileList.length > 0 && fileList.length <= 8) {
			for (const file of fileList) {
				const validateFileIndex = types ? findIndex(types, (type) => file.type.startsWith(type)) : -1;
				if (validateFileIndex >= 0) {
					data.push({
						file: file,
						url: window.URL.createObjectURL(file),
						type: file.type.startsWith('image') ? 'image' : 'video'
					});
				}
			}
		}
	} else {
		const file = fileList[0];
		data = {
			file: file,
			url: window.URL.createObjectURL(file),
			type: file.type.startsWith('image') ? 'image' : 'video'
		};
	}
	callBack(key, data);
};

export const isMobile = () => {
	if (typeof navigator === 'undefined' || typeof navigator.userAgent !== 'string') {
		return false;
	}
	return /Mobile/.test(navigator.userAgent);
};

export const windowScroll = (
	value: number,
	position: 'top' | 'bottom' = 'top',
	behavior: 'auto' | 'smooth' = 'smooth'
) =>
	window.scrollTo({
		[position]: value,
		behavior: behavior
	});

export const toRoundTwoDecimal = (num: number) => {
	return Math.round(num * 100) / 100 || 0;
};

export const dateFormate = (date: Moment) => {
	return moment(date).format('DD/MM/YYYY');
};

export const dateFormat = (date: Date, format = 'YYYY-DD-MM') => {
	if (isNull(date)) {
		return null;
	}
	return moment(date.toISOString()).format(format);
};

export const getStartingIndex = (recordPerPage: number, currentPage: number) => {
	return recordPerPage * (currentPage - 1);
};


export const getTextColor =((leave: number, range: number[]) => {
	return leave > range[1] ? 'green' : leave === range[0] ? 'red' : 'blue';
});


export const getTotalWorkingHourColor = (time: string) => {
	const actualHour = moment(time, 'HH:mm');
	const dealLine = moment(DeadLine.WORKING_HOURS, 'HH:mm');
	return actualHour.isBefore(dealLine) ? 'red' : 'green';
};

export const getCheckInColor = (time: string, deadline: string) => {
	const actualHour = moment(time, 'HH:mm:ss');
	const dealLine = moment(deadline, 'HH:mm:ss');
	return actualHour.isAfter(dealLine) ? 'red' : 'green';
};

export const getCheckOutColor = (time: string) => {
	const actualHour = moment(time, 'HH:mm:ss');
	const dealLine = moment(DeadLine.CHECK_OUT, 'HH:mm:ss');
	return actualHour.isBefore(dealLine) ? 'red' : 'green';
};

export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getDay = (date: Moment) => {
    return moment(date).format('dddd');
};
