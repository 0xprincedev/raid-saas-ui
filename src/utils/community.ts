import axios from 'utils/axios'

export const apiCreateCommunity = async (data: any) => {
	try {
		const res = await axios.post('/community', data)
		return res
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiGetCommunities = async (walletAddress: string) => {
	try {
		const { data } = await axios.post('/community/getCommunities', { walletAddress })
		return data.communities
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiUpdateCommunity = async (data: any) => {
	try {
		const res = await axios.put('/community', data)
		return res.data
	} catch (err: any) {
		throw Error(err)
	}
}