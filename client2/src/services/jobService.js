import {
    HANDLE_JOB_CHANGE,
    CLEAR_JOB_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    EDIT_JOB,
    DELETE_JOB_BEGIN,
    SH0W_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    SET_SEARCH,
    CLEAR_SEARCH_VALUES,
    UPDATE_PAGE
} from "../context/actions";
import { logoutUser } from "./userService.js";
import { clearAlert } from "./uiService.js";
import getAuthFetch from './apiService.js';

const handleJobChange = (dispatch, payload) => {
    const { name, value } = payload;
    dispatch({
        type: HANDLE_JOB_CHANGE,
        payload: { name, value }
    });
}

const setSearch = (dispatch, payload) => {
    const { name, value } = payload;
    dispatch({
        type: SET_SEARCH,
        payload: { name, value }
    });
}

const updatePage = (dispatch, page) => {
    dispatch({
        type: UPDATE_PAGE,
        payload: { page }
    });
}

const clearJobValues = (dispatch) => {

    dispatch({
        type: CLEAR_JOB_VALUES
    });
}

const clearSearchValues = (dispatch) => {

    dispatch({
        type: CLEAR_SEARCH_VALUES
    });
}

const createJob = async (dispatch, job, token) => {
    const authFetch = getAuthFetch(token, () => logoutUser(dispatch));
    const action = job.editJobId ? 'edit' : 'create';
    const url = action === 'edit' ? `/jobs/${job.editJobId}` : '/jobs'
    const func = action === 'edit' ? 'patch' : 'post'

    dispatch({ type: CREATE_JOB_BEGIN });
    try {
        const response = await authFetch[func](url, job);
        if (response.data) {
            const { position, company, jobLocation, status, jobType } = response.data.job;
            console.log(response.data);
            dispatch({
                type: CREATE_JOB_SUCCESS,
                payload: {
                    position,
                    company,
                    jobLocation,
                    status,
                    jobType,
                    msg: `Job ${job.editJobId ? 'Updated' : 'Created'} Successfully`
                }
            });
            if (action === 'create') {
                dispatch({
                    type: CLEAR_JOB_VALUES
                })
            }
        }
    }
    catch (error) {
        if (error.response.status !== 401) {
            dispatch({ type: CREATE_JOB_ERROR, payload: { msg: error.response.data.msg } });
        }
    }
    clearAlert(dispatch);
}

const getJobs = async (dispatch, token, data) => {
    const authFetch = getAuthFetch(token, () => logoutUser(dispatch));

    dispatch({ type: GET_JOBS_BEGIN });

    try {
        const query = Object.entries(data).reduce((acc, cur, index, orig) => {
            acc += `${cur[0]}=${cur[1]}`;
            if (index < orig.length - 1) {
                acc += '&';
            }
            return acc;
        }, '');

        const response = await authFetch.get(`/jobs?${query}`);
        if (response.data) {
            const { jobs, totalJobs, numOfPages } = response.data;
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: {
                    jobs,
                    totalJobs,
                    numOfPages,
                }
            })
        }

    }
    catch (error) {
        logoutUser(dispatch);
    }

    clearAlert(dispatch)
}

const setEditJob = async (dispatch, job) => {

    dispatch({
        type: EDIT_JOB,
        payload: job
    })
}

const deleteJob = async (dispatch, id, token) => {
    const authFetch = getAuthFetch(token, () => logoutUser(dispatch));

    dispatch({ type: DELETE_JOB_BEGIN });
    try {
        await authFetch.delete(`/jobs/${id}`);
        getJobs(dispatch, token)
    }
    catch (error) {
        logoutUser(dispatch);
    }
}

const showStats = async (dispatch, token) => {
    const authFetch = getAuthFetch(token, () => logoutUser(dispatch));

    dispatch({ type: SH0W_STATS_BEGIN });

    try {
        const response = await authFetch.get('/jobs/stats');
        if (response.data) {
            const { stats, monthlyApplications } = response.data;
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats,
                    monthlyApplications,
                }
            })
        }
    }
    catch (error) {
        logoutUser(dispatch);
    }
    clearAlert(dispatch);

}

export { handleJobChange, clearJobValues, createJob, getJobs, setEditJob, deleteJob, showStats, setSearch, clearSearchValues, updatePage }