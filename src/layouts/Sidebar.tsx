import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import { setMobileMenuStatus } from 'slices/userSlice'
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

interface Props {
	type: number
}

const Sidebar = ({ type }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

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

	return (
		<>
			<UserInfoEditModal
				open={editModalOpen}
				closeModal={() => setEditModalOpen(false)}
			/>
			<aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
				<nav className="menu">
					{type === 0 ? (
						<>
							<div className={`menu-item ${isActive('dashboard')}`}>
								<Link to="/dashboard" className="menu-link">
									Dashboard
								</Link>
							</div>
							<div className={`menu-item menu-communities ${isActive('communities')}`}>
								<Link
									to="/communities"
									className="menu-link"
									onClick={handleClickCommunity}
								>
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
							<Button
								className="btn-border-gradient book-a-raid"
								onClick={() => navigate('/book-a-raid')}
							>
								<span className="btn__label">Book a Raid</span>
							</Button>
						</>
					) : (
						<>
							<div className={`menu-item ${isActive('book-a-raid')}`}>
								<Link to="/book-a-raid" className="menu-link">
									Book a Raid
								</Link>
							</div>
							<div className={`menu-item ${isActive('profile')}`}>
								<Link to="/profile" className="menu-link">
									Profile
								</Link>
							</div>
							<Button
								className="btn-border-gradient start-raiding"
								onClick={() => navigate('/dashboard')}
							>
								<span className="btn__label">Start Raiding</span>
							</Button>
						</>
					)}
				</nav>
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
