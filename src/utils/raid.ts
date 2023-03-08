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

export const apiGetRaid = async () => {
	try {
		const res = await axios.get('/raid')
		return res
	} catch (err: any) {
		throw Error(err)
	}
}
