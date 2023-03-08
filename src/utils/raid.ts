import axios from 'utils/axios'
import { apiGetUserInformation } from './user'

export const createRaid = async (data: Raid) => {
	const { _id } = apiGetUserInformation()
	try {
		const res = await axios.post('/raid', { ...data, user: _id })
		return res
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiGetRaid = async (communityId: string) => {
	try {
		const res = await axios.get('/raid', {
			params: {
				communityId,
			}
		})
		return res
	} catch (err: any) {
		throw Error(err)
	}
}
