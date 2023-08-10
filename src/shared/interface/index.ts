import { Location, NavigateFunction } from 'react-router-dom';
export interface ResponseObj<T> {
	isError: boolean;
	message: string;
	errorMessages: { [key: string]: string[] };
	data: T;
}

export interface QueryParameters {
	limit?: number;
	page?: number;
	offset?: number;
	search?: number;
}

export interface NumberToString {
	[key: number]: string;
}

export interface AwsCredentials {
	bucketURL: string;
	region: string;
	bucket: string;
	credentials: {
		AccessKeyId: string;
		SecretAccessKey: string;
		SessionToken: string;
		Expiration: Date;
	};
}

export interface AwsParamsSchema {
	Key: string;
	ContentType: string;
	Body: File;
	Bucket: string;
}

export interface RouteComponentParams {
	location: Location;
	navigate: NavigateFunction;
	match: {
		params: {
			[key: string]: any;
		};
	};
}

export type ShowStagesKey =
	| 'REGISTRATION'
	| 'SEAT_ALLOCATION'
	| 'PRE_SHOW_RESULTS'
	| 'SHOW_LIVE'
	| 'SHOW_END'
	| 'SHOW_STALLED';
export type ShowStagesInfo =
	| 'registration'
	| 'seatAllocation'
	| 'preShowResult'
	| 'showLive'
	| 'showEnd'
	| 'showStalled';

export * from './state';

export interface IFilters {
	[key: string]: string;
}

export interface GetParameters {
	queryData: {
		page: number;
		recordPerPage: number;
		orderBy?: string;
		firstId?: number;
		lastId?: number;
		isPrevious?: boolean;
		// orderByColumn?: string;
	};
	filters?: {
		[key: string]: string;
	};
	quarter?: any;
	year?: any;
}

export interface OptionalGetParameters {
	page?: number;
	recordPerPage: number;
	orderBy?: string;
	// orderByColumn?: string;
	filters?: {
		[key: string]: string;
	};
	quarter?: any;
	year?: any;
	firstId?: number;
	lastId?: number;
	isPrevious?: boolean;
	userId?: string;
}

export interface IPagination {
	currentPage: number;
	nextPage?: number | null;
	recordPerPage: number;
	remainingCount?: number;
	total?: number;
	totalPages?: number;
}
export interface IResponseObject<T> {
	isError: boolean;
	message: string;
	data: T;
}
