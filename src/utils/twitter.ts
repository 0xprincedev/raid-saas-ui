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