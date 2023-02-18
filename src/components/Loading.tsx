import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
	return (
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
			}}
		>
			<CircularProgress color="secondary" />
		</Box>
	)
}

export default Loading
