import { Box, CircularProgress } from '@mui/material'

import { useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'

const Loading = () => {
	// @ts-ignore
	const isLoading = useAppSelector((state: RootState) => state.user.isLoading)
	return isLoading ? (
		<Box
			sx={{
				position: 'fixed',
				zIndex: 2000,
				top: 0,
				left: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100vw',
				height: '100vh',
				backgroundColor: '#0008',
				backdropFilter: 'blur(3px)',
			}}
		>
			<CircularProgress color="secondary" />
		</Box>
	) : (
		<></>
	)
}

export default Loading
