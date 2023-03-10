import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import { getCommunities, setMobileMenuStatus } from 'slices/user'
import { communityRegex } from "constant"

interface Props {
	type: number
}

const Sidebar = ({ type }: Props) => {
	const { solana }: any = window
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const { pathname} = useLocation()

	const communityId = useMemo(() => {
		const match = pathname.match(communityRegex)
		if (match && match.length > 1) {
			return match[1]
		}
	}, [pathname])

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const isMobileMenuOpen = useAppSelector(
		//@ts-ignore
		(state: RootState) => state.user.isMobileMenuOpen
	)
//@ts-ignore
	const myComminities = useAppSelector((state: RootState) => state.user.communities)

	useEffect(() => {
		if (pathname.includes('communities')) {
			setIsOpen(true)
			const get = async () => {
				await dispatch(getCommunities(solana?._publicKey))
			}
			get()
		} else {
			setIsOpen(false)
		}
	}, [pathname]) // eslint-disable-line

	useEffect(() => {
		if (myComminities?.length && pathname.includes('communities')) {
			navigate(`/communities/${myComminities[0]._id}`)
		}
	}, [myComminities, navigate, pathname])

	const isActive = (_pathname: string) => {
		return decodeURI(pathname).includes(_pathname) ? 'active' : ''
	}

	const handleClickCommunity = () => {
		setIsOpen((prev) => !prev)
	}

	return (
		<>
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
									{myComminities?.map((community: any, index: number) => (
										<div
											className={`community ${communityId === community._id && 'active'}`}
											key={index}
										>
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
