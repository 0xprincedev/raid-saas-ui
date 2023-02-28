import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { getCommunities as apiGetCommunities } from 'utils/user'

interface Props {
	isMobileMenuOpen: boolean
	colorMode: ColorMode
	isLoading: boolean
	communities: Record<string, any>[]
}

const initialState: Props = {
	isMobileMenuOpen: false,
	colorMode: (localStorage.getItem('raid-saas-color-mode') as ColorMode) || 'light',
	isLoading: false,
	communities: [],
}

export const getCommunities = createAsyncThunk(
	'user/getCommunities',
	async (walletAddress: string) => {
		try {
			const res = await apiGetCommunities(walletAddress)
			return res
		} catch (err: any) {
			throw Error(err)
		}
	}
)

export const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setMobileMenuStatus: (state, action: PayloadAction<boolean>) => {
			state.isMobileMenuOpen = action.payload
		},
		setColorMode: (state, action: PayloadAction<ColorMode>) => {
			state.colorMode = action.payload
		},
		setLoadingStatus: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCommunities.fulfilled, (state, action: PayloadAction<any>) => {
			state.communities = action.payload
		})
	},
})

export const { setMobileMenuStatus, setColorMode, setLoadingStatus } = user.actions

export default user.reducer
