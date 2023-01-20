import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { apiGetUserProfile } from 'utils/user'

interface Props {
	isMobileMenuOpen: boolean
	walletAddress: string
	username?: string
	twitterId: string
	avatar: string
}

const initialState: Props = {
	isMobileMenuOpen: false,
	walletAddress: '',
	username: '',
	twitterId: '',
	avatar: '/images/avatar.png',
}

export const getUserProfile = createAsyncThunk(
	'userSlice/getUserProfile',
	async (walletAddress: string) => {
		try {
			const res = await apiGetUserProfile(walletAddress)
			return res
		} catch (err: any) {
			throw Error(err)
		}
	}
)

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setMobileMenuStatus: (state, action: PayloadAction<boolean>) => {
			state.isMobileMenuOpen = action.payload
		},
		setWalletAddress: (state, action: PayloadAction<string>) => {
			state.walletAddress = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
			state.username = action.payload.username || ''
			state.twitterId = action.payload.twitterId || ''
			state.avatar = action.payload.avatar || ''
		})
	},
})

export const { setMobileMenuStatus, setWalletAddress } = userSlice.actions

export default userSlice.reducer
