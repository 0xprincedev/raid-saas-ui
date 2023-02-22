import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Props {
	isMobileMenuOpen: boolean
	colorMode: ColorMode
	isLoading: boolean
}

const initialState: Props = {
	isMobileMenuOpen: false,
	colorMode: (localStorage.getItem('raid-saas-color-mode') as ColorMode) || 'light',
	isLoading: false,
}

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
})

export const { setMobileMenuStatus, setColorMode, setLoadingStatus } = user.actions

export default user.reducer
