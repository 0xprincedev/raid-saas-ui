import axios from 'axios'

const instance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
})

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')
	config.headers.Authorization = token || ''
	return config
})

export default instance
