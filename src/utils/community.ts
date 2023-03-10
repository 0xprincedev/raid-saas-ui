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

export const apiUpdateCommunity = async ({id, communityName, twitterLink, discordLink}: Record<string, string>) => {
	try {
		const { data } = await axios.put('/community', {id, communityName, twitterLink, discordLink})
		return data
	} catch (err: any) {
		throw Error(err)
	}
}