import axios from 'axios';

import {  LOGIN_URL, USER_DATA_URL } from '../../config/config';
import { setToken, getToken, logout } from '../../utils/utils';
import { getRequests } from './requests.js';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_HAS_ERRORED = 'USER_LOGIN_HAS_ERRORED';
export const USER_LOGIN_IS_LOADING = 'USER_LOGIN_IS_LOADING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_IS_LOGGED_IN = 'USER_IS_LOGGED_IN';
export const USER_LOGOUT_RESET_STORE = 'USER_LOGOUT_RESET_STORE';


export const userLoginHasErrored = (bool, errors = {}) => ({
  type: USER_LOGIN_HAS_ERRORED,
  hasErrored: bool,
  errors: errors
});

export const userLoginIsLoading = (bool) => ({
  type: USER_LOGIN_IS_LOADING,
  isLoading: bool
})

export const userLoginSuccess = (user) => ({
  type: USER_LOGIN_SUCCESS,
  user
})

export const userLogout = () => async (dispatch) => {

  logout();

  await dispatch({
    type: USER_LOGOUT_RESET_STORE
  });

  dispatch(getRequests());
}

export const isLoggedIn = () => async (dispatch, getState) => {

  const bool = getToken() ? true : false;
  if(bool && !getState().user.id) {

    const token = getToken();

    const config = { headers: { authorization: `Bearer ${token}` } }

    axios.get(USER_DATA_URL, config)

      .then(response => {
        dispatch(userLoginSuccess(response.data));
      })

      .catch(err => console.log(err));

  }

  dispatch({
    type: USER_IS_LOGGED_IN,
    isLoggedIn: bool
  })

}

export const userLoginRequest = (creds) => async (dispatch, getState) => {
  dispatch(userLoginIsLoading(true));
  axios.post(LOGIN_URL, creds)
    .then(response => {
      if(response.data.status === 'error') {
        let errors = {};
        // response.data.message Array[]
        response.data.message.forEach(message => {
          errors = { ...errors, [message.param]: message.msg }
        });

        dispatch(userLoginIsLoading(false));
        return dispatch(userLoginHasErrored(true, errors))
      }

      if(response.data.status === 'success') {
        setToken(response.data.token);
        dispatch(isLoggedIn());
        dispatch(userLoginIsLoading(false));
      } else {
        dispatch(userLoginIsLoading(false));
        dispatch(userLoginHasErrored(true));
      }
    })

    .catch(err => {
      dispatch(userLoginIsLoading(false));
      dispatch(userLoginHasErrored(true));
    })
}
