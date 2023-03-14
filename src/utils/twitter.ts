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
		const res = await axios.post('/twitter/comment', { userId, raidId, description })
		return res
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiSetReTweet = async ({userId, raidId}: Record<string, string>) => {
	try {
		const res = await axios.post('/twitter/retweet', { userId, raidId })
		return res
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiSetFavorite = async ({userId, raidId}: Record<string, string>) => {
	try {
		const res = await axios.post('/twitter/favorite', { userId, raidId })
		return res
	} catch (err: any) {
		throw Error(err)
	}
}