import {GET_ERRORS, LOADING, SET_CURRENT_USER, GET_PROFILE} from './types';
import axios from 'axios';
import setAuthToken from '../validations/setAuthToken';

//Register redux action
export const registerUser = (user, history, query) => (dispatch) => {
  dispatch(Loading(true))
  axios
    .post('/api/auth/user/registration', user)
    .then(res => {
      if (res.status === 200) {
        if(query !== '') {
          window.location.href = `/app/login${query}`;
        } else {
          history.push("/app/login");
        }
        dispatch(Loading(false))
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      dispatch(Loading(false))
    })
}

//LOGIN REDUX
export const loginUser = (userDataLogin) => (dispatch) => {
  dispatch(Loading(true))
  axios.post('/api/auth/login/user', userDataLogin)
    .then(res => {
      const {token, status, user, success} = res.data;
      if(status === 200) {
        setAuthToken(token);
        dispatch(setCurrentUser(user, token, success));
        dispatch(getProfile());
        dispatch(Loading(false));
      } else if (status === 400) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        })
        dispatch(Loading(false))
      }
    })
    .catch((err) =>
      console.warn(err)
    );
}

//SET CURRENT USER
export const setCurrentUser = (decoded, token, success) => {
  return {
    type: SET_CURRENT_USER,
    isAuthenticated: success,
    payload: decoded,
    accessToken: token,
  };
};

//GET CURRENT PROFILE
export const getProfile = () => (dispatch) => {
  axios
    .get("/api/auth/current/user")
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: {},
      });
    });
};

//SET LOADING
export const Loading = (b) => {
  return {
    type: LOADING,
    payload: b
  };
};

//LOG USER OUT
//Log user out
export const logoutUser = () => (dispatch) => {
  document.cookie = `_usid=;expires=${new Date()};path=/`;
  document.cookie = `_uuv=;expires=${new Date()};path=/`;
  setAuthToken(false);
  dispatch(setCurrentUser({}, '', false))
  window.location.href = '/'
};