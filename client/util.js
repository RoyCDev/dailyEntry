import axios from 'axios'

const enrtyClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export default enrtyClient;