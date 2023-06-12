import axios from 'axios';

const getAuthFetch = (token, logoutUser) => {
    const authFetch = axios.create({
        baseURL: '/api/v1',
    });

    authFetch.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    authFetch.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response.status === 401) {
            logoutUser();
        }
        return Promise.reject(error);
    });

    return authFetch;
}

export default getAuthFetch;
