import axios from 'axios'

const resourceApi = axios.create({
    baseURL: '/resource_api',
    timeout: '5000',
})

const authorizeApi = axios.create({
    baseURL: '/authorize_api',
    timeout: '5000',
})



export { resourceApi, authorizeApi }
