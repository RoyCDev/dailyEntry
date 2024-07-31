import axios from 'axios'

const entryClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

const formatDate = (date) => {
    if (!date) return null
    return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`
}

export { entryClient, formatDate }