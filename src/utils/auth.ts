import axios from 'axios'

export const apiGetUserProfile = async (walletAddress: string) => {
	try {
		const res = await axios.get(`/user/${walletAddress}`)
		return res.data.user
	} catch (err: any) {
		throw Error(err)
	}
}

export const apiUpdateUserProfile = async (profile: any) => {
	try {
		await axios.put('/user', {
			...profile,
		})
	} catch (err: any) {
		throw Error(err)
	}
}
