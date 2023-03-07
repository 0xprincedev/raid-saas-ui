import { toast } from 'react-toastify'
import axios from 'utils/axios'

export const apiRegister = async (walletAddress: string) => {
	try {
		const { data } = await axios.post('/user/register', { walletAddress })
		return data
	} catch (err: any) {
		throw Error(err)
	}
}

export const login = async (walletAddress: string) => {
	try {
		const { data } = await axios.post('/user/login', { walletAddress })
		return data
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiLoginDiscord = async ({walletAddress, code}: Record<string, string>) => {
	try {
		const { data } = await axios.post('/user/login-discord', { walletAddress, code })
		return data
	} catch (err: any) {
		throw Error(err)
	}
}

export const getUserInformation = () => {
	return JSON.parse(localStorage.getItem('user') || '')
}

export const getCommunities = async (walletAddress: string) => {
	try {
		const { data } = await axios.post('/user/getCommunities', { walletAddress })
		return data.communities
	} catch (err: any) {
		throw Error(err)
	}
}
