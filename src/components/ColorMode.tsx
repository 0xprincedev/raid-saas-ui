import { useEffect, useState } from 'react'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import { useAppDispatch } from 'app/hooks'
import { setColorMode as setColorModeSlice } from 'slices/userSlice'

const ColorMode = () => {
	const [colorMode, setColorMode] = useState<ColorMode>(
		(localStorage.getItem('raid-saas-color-mode') as ColorMode) || 'light'
	)
	const dispatch = useAppDispatch()
		dispatch(setColorModeSlice(colorMode))
	}, [colorMode, dispatch])

	return colorMode === 'light' ? (
		<LightModeIcon sx={{ cursor: 'pointer' }} onClick={() => setColorMode('dark')} />
	) : (
		<DarkModeIcon sx={{ cursor: 'pointer' }} onClick={() => setColorMode('light')} />
	)
}

export default ColorMode
