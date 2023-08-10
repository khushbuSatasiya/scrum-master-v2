import { AuthState, LoaderState } from 'shared/interface';

export interface UserLoginData {
	email: string;
	password: string;
}

export interface DispatchProps {
	onLogin: (payload: UserLoginData) => void;
}

export interface MapStateProps extends AuthState, LoaderState {}

export interface CustomLoginProps {
	submit: (payload: UserLoginData) => void;
}

export interface UserData {
	token: string;
	userId?: string;
	user: JwtTokenData;
}

export interface JwtTokenData {
	email: string;
	id: string;
	organizations: Organizations[];
}

export interface Organizations {
	id: string;
	name: string;
	slackId: string;
}

export interface LoginResponse {
	data: { token: string; userId: string };
	message:string
}

export interface SideBarMenu {
	name: string;
	route: string;
	icon: string;
	children?: any;
	reactRoute: string;
}

export interface UserProfileResponse {
	name: string;
	id: string;
	userName: string;
	displayName: string;
	profileImageUrl: string;
	role: string;
	isActive: number;
	createdAt: string;
	updatedAt: string;
}

export interface ChangePasswordParams {
	oldPassword: string;
	newPassword: string;
}

export interface UpdateProfileParams {
	displayName: string;
	profileImageUrl: string;
}
