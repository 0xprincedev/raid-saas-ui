import axios from 'utils/axios'
import { getUserInformation } from './user'

export const createRaid = async (data: Raid) => {
	const { _id } = getUserInformation()
	try {
		const res = await axios.post('/raid', { ...data, user: _id })
		return res
	} catch (err: any) {
		throw Error(err)
	}
}
