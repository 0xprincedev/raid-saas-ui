import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import { getUserProfile, setMobileMenuStatus, setWalletAddress } from 'slices/userSlice'
import UserInfoEditModal from 'components/Modal/UserInfoEditModal'

const communities = [
	{
		name: 'DeGods',
		badge: 0,
	},
	{
		name: 'Okay Bears',
		badge: 5,
	},
	{
		name: 'y00ts',
		badge: 2,
	},
	{
		name: 'Bored Ape Yacht Club',
		badge: 2,
	},
	{
		name: 'Jelly Rascals',
		badge: 0,
	},
	{
		name: 'Decentraland',
		badge: 5,
	},
	{
		name: 'Vee Friends',
		badge: 2,
	},
]

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
	const { pathname } = useLocation()
	const dispatch = useAppDispatch()
	const wallet = useWallet()

	const username = useAppSelector((state: RootState) => state.userSlice.username)
	const twitterId = useAppSelector((state: RootState) => state.userSlice.twitterId)

	useEffect(() => {
		if (!wallet.publicKey) {
			dispatch(setWalletAddress(''))
			return
		}
		dispatch(setWalletAddress(wallet.publicKey.toString()))
		dispatch(getUserProfile(wallet.publicKey.toString()))
	}, [wallet.publicKey, dispatch])

	const isMobileMenuOpen = useAppSelector(
		(state: RootState) => state.userSlice.isMobileMenuOpen
	)

	useEffect(() => {
		if (pathname.includes('communities')) {
			setIsOpen(true)
		} else {
			setIsOpen(false)
		}
	}, [pathname])

	const isActive = (_pathname: string) => {
		return decodeURI(pathname).includes(_pathname) ? 'active' : ''
	}

	const handleClickCommunity = () => {
		setIsOpen((prev) => !prev)
	}

	const handleEditClick = () => {
		setEditModalOpen(true)
	}

	return (
		<>
			<UserInfoEditModal
				open={editModalOpen}
				closeModal={() => setEditModalOpen(false)}
			/>
			<aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
				<nav className="menu">
					<div className={`menu-item ${isActive('dashboard')}`}>
						<Link to="/dashboard" className="menu-link">
							Dashboard
						</Link>
					</div>
					<div className={`menu-item menu-communities ${isActive('communities')}`}>
						<Link to="/communities" className="menu-link" onClick={handleClickCommunity}>
							Communities
							<ExpandMoreIcon />
						</Link>
						<div className={`communities ${isOpen ? 'opened' : ''}`}>
							{communities.map((community, index) => (
								<div className="community" key={index}>
									{community.name}
								</div>
							))}
						</div>
					</div>
					<div className={`menu-item ${isActive('leaderboard')}`}>
						<Link to="/leaderboard" className="menu-link">
							Leaderboard
						</Link>
					</div>
					<div className={`menu-item ${isActive('settings')}`}>
						<Link to="/settings" className="menu-link">
							Settings
						</Link>
					</div>
				</nav>
				{/* <div className="profile">
					<div className="user-information">
						<Avatar src="/images/avatar.png" />
						<div className="user-detail">
							<p className="username">{username}</p>
							<p className="twitter-id">{twitterId}</p>
						</div>
						<span title="Click to edit" onClick={handleEditClick}>
							<EditIcon sx={{ width: 16, height: 16 }} />
						</span>
					</div>
					<WalletMultiButton />
				</div> */}
			</aside>
			{isMobileMenuOpen && (
				<div
					className="fixed-background"
					onClick={() => dispatch(setMobileMenuStatus(false))}
				/>
			)}
		</>
	)
}

export default Sidebar
