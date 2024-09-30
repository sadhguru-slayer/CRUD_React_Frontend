import axios from 'axios'

const baseUrl = 'https://crud-django-react-gn21.onrender.com/'
const AxiosInstance = axios.create({
    baseURL: baseUrl, 
    timeout: 5000, 
    headers: {
        "Content-Type": "application/json", 
        accept: "application/json"
    }
})

export default AxiosInstance