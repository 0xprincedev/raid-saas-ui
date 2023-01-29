import { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const ColorMode = () => {
	const [colorMode, setColorMode] = useState<ColorMode>(
		(localStorage.getItem('raid-saas-color-mode') as ColorMode) || 'light'
	)

	useEffect(() => {
		localStorage.setItem('raid-saas-color-mode', colorMode)
		document.body.className = colorMode
	}, [colorMode])

	const handleSwitchMode = () => {
		if (colorMode === 'light') {
			setColorMode('dark')
			return
		}
		setColorMode('light')
	}

	return (
		<IconButton onClick={handleSwitchMode}>
			{colorMode === 'light' ? <LightModeIcon /> : <DarkModeIcon sx={{ fill: '#FFF' }} />}
		</IconButton>
	)
}

export default ColorMode
