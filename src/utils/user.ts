import { toast } from 'react-toastify'
import axios from 'utils/axios'

export const apiRegister = async ({walletAddress, twitterDisplayName, twitterUserName, discordName}: Record<string, string>) => {
	try {
		const { data } = await axios.post('/user/register', {walletAddress, twitterDisplayName, twitterUserName, discordName})
		return data
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiLogin = async (walletAddress: string) => {
	try {
		const { data } = await axios.post('/user/login', { walletAddress })
		return data
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiLoginDiscord = async (code: string) => {
	try {
		const { data } = await axios.post('/user/login-discord', { code })
		return data
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiGetUserInformation = () => {
	return JSON.parse(localStorage.getItem('user') || '')
}

export const apiGetCommunities = async (walletAddress: string) => {
	try {
		const { data } = await axios.post('/user/getCommunities', { walletAddress })
		return data.communities
	} catch (err: any) {
		throw Error(err)
	}
}
