import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import MenuIcon from '@mui/icons-material/Menu'

import { useAppDispatch } from 'app/hooks'
import { setMobileMenuStatus } from 'slices/userSlice'

const Header = () => {
	const dispatch = useAppDispatch()

	const handleOpenMenu = () => {
		dispatch(setMobileMenuStatus(true))
	}

	return (
		<header>
			<div className="container">
				<MenuIcon
					sx={{ width: 24, height: 24, cursor: 'pointer' }}
					onClick={handleOpenMenu}
				/>
				<nav>
					<WalletMultiButton />
				</nav>
			</div>
		</header>
	)
}

export default Header
