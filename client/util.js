import axios from 'axios'

const entryClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

const toastConfig = (status, desc) => ({
    status: status,
    description: desc,
    position: "top-right",
    duration: 2500,
    isClosable: true,
})

export { entryClient, toastConfig }