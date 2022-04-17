import axios from 'axios'

const resourceApi = axios.create({
    baseURL: '/resource_api',
    timeout: '5000',
});

const authorizeApi = axios.create({
    baseURL: '/authorize_api',
    timeout: '5000',
});

authorizeApi.interceptors.request.use(
    config => {

        return config;
    },
    error => {
        return error;
    }
)

authorizeApi.interceptors.response.use(
    response => {

        return response;
    },
    error => {
        return error;
    }
)

export { resourceApi, authorizeApi }
