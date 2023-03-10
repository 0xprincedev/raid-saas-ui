import axios from 'utils/axios'

export const apiGetTwitterInfo = async (tweetId: string) => {
	try {
		const res = await axios.get('/twitter/info', {
			params: {
				tweetId,
			}
		})
		return res
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiSetComment = async ({userId, raidId, description}: Record<string, string>) => {
	try {
		const res = await axios.post('/activity/comment', { userId, raidId, description })
		return res
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiSetReNew = async ({userId, raidId}: Record<string, string>) => {
	try {
		const res = await axios.post('/activity/renew', { userId, raidId })
		return res
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiSetFavorite = async ({userId, raidId}: Record<string, string>) => {
	try {
		const res = await axios.post('/activity/favorite', { userId, raidId })
		return res
	} catch (err: any) {
		throw Error(err)
	}
}