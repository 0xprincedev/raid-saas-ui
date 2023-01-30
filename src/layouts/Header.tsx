import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'

import { useAppDispatch } from 'app/hooks'
import { setMobileMenuStatus } from 'slices/userSlice'
import ColorMode from 'components/ColorMode'

const Header = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleOpenMenu = () => {
		dispatch(setMobileMenuStatus(true))
	}

	return (
		<header>
			<div className="container">
				<MenuIcon
					sx={{ width: 24, height: 24, cursor: 'pointer' }}
					className="mobile-menu-icon"
					onClick={handleOpenMenu}
				/>
				<nav>
					<ColorMode />
					<Button
						className="btn-gradient"
						onClick={() => navigate('/settings/create-community')}
					>
						Create Community
					</Button>
				</nav>
			</div>
		</header>
	)
}

export default Header
