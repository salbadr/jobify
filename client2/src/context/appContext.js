import { createContext, useContext, useReducer } from "react"
import { reducer } from "./reducer";

import { loginUser, logoutUser, updateUser, registerUser } from "../services/userService.js";
import { displayAlert, toggleSidebar } from "../services/uiService.js";
import {
    clearJobValues, createJob, deleteJob, getJobs,
    handleJobChange, setEditJob, showStats, setSearch, clearSearchValues,
    updatePage
} from "../services/jobService.js";

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token'),
    userLocation: localStorage.getItem('location') || '',
    showSidebar: false,
    job: {
        editJobId: '',
        isEditing: false,
        position: '',
        company: '',
        jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
        jobType: 'full-time',
        jobLocation: localStorage.getItem('location') || '',
        statusOptions: ['pending', 'interview', 'declined'],
        status: 'pending',
        jobs: [],
        totalJobs: 0,
        page: 1,
        numOfPages: 1,
        stats: {
            declined: 0,
            pending: 0,
            interview: 0,
        },
        monthlyApplications: [],
        search: '',
        searchStatus: 'all',
        searchType: 'all',
        sort: 'latest',
        sortOptions: ['latest', 'oldest', 'a-z', 'z-a']

    },


}

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert: () => displayAlert(dispatch),
                registerUser: (currentUser) => registerUser(dispatch, currentUser),
                loginUser: (currentUser) => loginUser(dispatch, currentUser),
                logoutUser: () => logoutUser(dispatch),
                updateUser: (currentUser) => updateUser(dispatch, currentUser, state.token),
                toggleSidebar: () => toggleSidebar(dispatch),
                handleJobChange: (data) => handleJobChange(dispatch, data),
                clearJobValues: () => clearJobValues(dispatch),
                createJob: (job) => createJob(dispatch, job, state.token),
                getJobs: () => getJobs(dispatch, state.token, { status: state.job.searchStatus, search: state.job.search, jobType: state.job.searchType, sort: state.job.sort, page: state.job.page }),
                setEditJob: (job) => setEditJob(dispatch, job),
                deleteJob: (id) => deleteJob(dispatch, id, state.token),
                showStats: () => showStats(dispatch, state.token),
                setSearch: (data) => setSearch(dispatch, data),
                clearSearchValues: () => clearSearchValues(dispatch),
                updatePage: (page) => updatePage(dispatch, page)
            }}>
            {children}
        </AppContext.Provider>

    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider }