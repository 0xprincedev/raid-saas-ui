import { toast } from 'react-toastify'
import axios from 'utils/axios'

export const login = async (walletAddress: string) => {
	try {
		const { data } = await axios.post('/user/login', { walletAddress })
		localStorage.setItem('token', data.token)
		localStorage.setItem('user', JSON.stringify(data.user))
		return true
	} catch (err: any) {
		toast.error(err.message)
		return false
	}
}

export const getUserInformation = () => {
	return JSON.parse(localStorage.getItem('user') || '')
}
