import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_JOB_CHANGE,
    CLEAR_JOB_VALUES,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    CREATE_JOB_BEGIN,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    EDIT_JOB,
    DELETE_JOB_BEGIN,
    SH0W_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    SET_SEARCH,
    CLEAR_SEARCH_VALUES,
    UPDATE_PAGE
} from "./actions";
export const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all the values'
            };
        case CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: ''
            };
        case REGISTER_USER_BEGIN:
        case UPDATE_USER_BEGIN:
        case LOGIN_USER_BEGIN:
        case CREATE_JOB_BEGIN:
        case DELETE_JOB_BEGIN:
        case SH0W_STATS_BEGIN:
            return {
                ...state,
                isLoading: true,
                showAlert: false
            };
        case LOGIN_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
            const { user, token, location, msg } = action.payload;
            return {
                ...state,
                user,
                token,
                userLocation: location,
                job: { ...state.job, jobLocation: location },
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: msg
            };
        case LOGIN_USER_ERROR:
        case UPDATE_USER_ERROR:
        case REGISTER_USER_ERROR:
        case CREATE_JOB_ERROR:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
                isLoading: false
            };
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                token: null,
                userLocation: '',
                job: { ...state.job, jobLocation: '' },
            }
        case HANDLE_JOB_CHANGE:
            return { ...state, job: { ...state.job, [action.payload.name]: action.payload.value } };
        case CLEAR_JOB_VALUES: {
            const job = {
                ...state.job,
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobType: 'full-time',
                jobLocation: state.userLocation,
                status: 'pending'
            }
            return {
                ...state, job
            }
        }
        case CREATE_JOB_SUCCESS: {
            const { position, company, jobLocation, status, jobType, msg } = action.payload;
            const job = {
                ...state.job,
                position,
                company,
                jobType,
                jobLocation,
                status
            }
            return {
                ...state,
                job,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: msg
            };
        }
        case GET_JOBS_BEGIN:
            return {
                ...state,
                isLoading: true,
                showAlert: false
            };
        case GET_JOBS_SUCCESS: {
            const { jobs, totalJobs, numOfPages } = action.payload;
            const job = {
                ...state.job,
                jobs,
                totalJobs,
                numOfPages,
            }
            return {
                ...state,
                job,
                isLoading: false,
                showAlert: false
            };

        }
        case EDIT_JOB: {
            const { _id, company, position, status, jobType, jobLocation } = action.payload;
            const job = {
                ...state.job,
                editJobId: _id,
                company,
                position,
                status,
                jobType,
                jobLocation,
                isEditing: true
            }

            return {
                ...state,
                job,
            };
        }
        case SHOW_STATS_SUCCESS: {
            const { stats, monthlyApplications } = action.payload;
            const job = {
                ...state.job,
                stats,
                monthlyApplications,
            }
            return {
                ...state,
                job,
                isLoading: false
            };

        }

        case SET_SEARCH: {
            return { ...state, job: { ...state.job, page: 1, [action.payload.name]: action.payload.value } };
        }

        case CLEAR_SEARCH_VALUES: {
            const job = {
                ...state.job,
                search: '',
                searchStatus: 'all',
                searchType: 'all',
                sort: 'latest',
            }
            return {
                ...state,
                job,
                isLoading: false
            };
        }

        case UPDATE_PAGE: {
            const { page } = action.payload;
            return { ...state, job: { ...state.job, page } };

        }
        default:
            throw Error(`Unknown action ${action.type}.`);

    }
}

