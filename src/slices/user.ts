import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { apiGetCommunities } from 'utils/user'
import { apiLogin, apiLoginDiscord, apiRegister } from 'utils/user'
import { saveToLocalStorage } from 'utils'
interface Props {
	isMobileMenuOpen: boolean
	colorMode: ColorMode
	isLoading: boolean
	communities: Record<string, any>[]
	isCreateAccountModalOpen: boolean
	currentStep: number
	user: Record<string, any>
}

const initialState: Props = {
	isMobileMenuOpen: false,
	colorMode: (localStorage.getItem('raid-saas-color-mode') as ColorMode) || 'light',
	isLoading: false,
	communities: [],
	isCreateAccountModalOpen: false,
	currentStep: 0,
	user: {
		avatar: '/images/avatar.png',
		walletAddress: [],
		discordName: null,
		twitterName: null,
	},
}

export const register = createAsyncThunk('user/register', async ({walletAddress, twitterDisplayName, twitterUserName, discordName}: Record<string, string>) => {
	try {
		const data = await apiRegister({walletAddress, twitterDisplayName, twitterUserName, discordName})
		return data
	} catch (err: any) {
		throw Error(err)
	}
})

export const login = createAsyncThunk('user/login', async (walletAddress: string) => {
	try {
		const data = await apiLogin(walletAddress)
		return data
	} catch (err: any) {
		throw Error(err)
	}
})

export const loginDiscord = createAsyncThunk('user/login-discord', async (code: string) => {
	try {
		const data = await apiLoginDiscord(code)
		return data
	} catch (err: any) {
		throw Error(err)
	}
})

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
		setIsCreateAccountModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isCreateAccountModalOpen = action.payload
		},
		setCurrentStep: (state, action: PayloadAction<number>) => {
			state.currentStep = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCommunities.fulfilled, (state, action: PayloadAction<any>) => {
			state.communities = action.payload
		})
		builder.addCase(register.fulfilled, (state, action:PayloadAction<any>) => {
			const data = action.payload

			if (data.success === true) {
				state.user = {
					...state.user,
					...data.user,
				}
				saveToLocalStorage('user', data.user)
				saveToLocalStorage('token', data.token)
			}
			return
		})
		builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
			const data = action.payload

			if (data.success === true) {
				state.user = {
					...state.user,
					...data.user,
				}
				saveToLocalStorage('user', data.user)
				saveToLocalStorage('token', data.token)
			} else {
				return data
			}
			return
		})
		builder.addCase(loginDiscord.fulfilled, (state, action: PayloadAction<any>) => {
			const data = action.payload
			state.user = {
				...state.user,
				discordName: data.discordName,
			}
			saveToLocalStorage('discordName', data.discordName)
			return
		})
	},
})

export const { setMobileMenuStatus, setColorMode, setLoadingStatus, setIsCreateAccountModalOpen, setCurrentStep } = user.actions

export default user.reducer
