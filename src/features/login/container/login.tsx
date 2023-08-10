import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { State, Action } from 'shared/interface';
import { createLoadingSelector } from 'shared/util/utility';

import * as LoginActions from '../store/login.action';
import { DispatchProps, UserLoginData, MapStateProps } from '../interface/login.interface';
import LoginComponent from '../component/loginForm';

const loadingSelector = createLoadingSelector(['AUTH']);
const mapStateToProps = (state: State): MapStateProps => {
    return {
        ...state.auth,
        loading: loadingSelector(state)
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<Record<string, unknown>, Record<string, unknown>, Action>): DispatchProps => {
    return {
        onLogin: (payload: UserLoginData) => dispatch(LoginActions.login(payload))
    };
};

export default connect<MapStateProps, DispatchProps, Record<string, unknown>, State>(mapStateToProps, mapDispatchToProps)(LoginComponent);
