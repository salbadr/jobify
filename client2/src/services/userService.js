import {
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    LOGOUT_USER,
} from "../context/actions.js"
import getAuthFetch from './apiService.js';
import axios from 'axios';

import { clearAlert } from "./uiService.js";

const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
}

const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
}

const registerUser = async (dispatch, currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
        const response = await axios.post('/api/v1/auth/register', currentUser);
        if (response.data) {
            const { user, token, location } = response.data;
            addUserToLocalStorage(response.data);
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location,
                    msg: 'Registeration Successful'
                }
            })
        }
    }
    catch (error) {
        dispatch({ type: REGISTER_USER_ERROR, payload: { msg: error.response.data.msg } });
    }
    clearAlert(dispatch);

}

const loginUser = async (dispatch, currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
        const response = await axios.post('/api/v1/auth/login', currentUser);
        if (response.data) {
            const { user, token, location } = response.data;
            addUserToLocalStorage(response.data);
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location,
                    msg: 'Login Successful'
                }
            })
        }
    }
    catch (error) {
        dispatch({ type: LOGIN_USER_ERROR, payload: { msg: error.response.data.msg } });
    }
    clearAlert(dispatch);
}

const logoutUser = (dispatch) => {
    removeUserFromLocalStorage();
    dispatch({ type: LOGOUT_USER });
}

const updateUser = async (dispatch, currentUser, token) => {
    const authFetch = getAuthFetch(token, () => logoutUser(dispatch));

    dispatch({ type: UPDATE_USER_BEGIN });
    try {
        const response = await authFetch.patch('/auth/updateUser', currentUser);
        if (response.data) {
            const { user, location } = response.data;
            addUserToLocalStorage({ ...response.data, token });
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {
                    token,
                    user,
                    location,
                    msg: 'Profile Update Successful'
                }
            })
        }
    }
    catch (error) {
        if (error.response.status !== 401) {
            dispatch({ type: UPDATE_USER_ERROR, payload: { msg: error.response.data.msg } });
        }
    }
    clearAlert(dispatch);
}

export { loginUser, logoutUser, registerUser, updateUser }