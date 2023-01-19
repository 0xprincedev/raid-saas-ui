import { Link, useLocation } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import PeopleIcon from '@mui/icons-material/People'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

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
	const { pathname } = useLocation()

	return (
		<aside className="sidebar">
			<div className="communities">
				<div className="title">
					<PeopleIcon />
					Communities
				</div>
				<div className="content">
					{communities.map((coummunity, index) => (
						<Link
							to={`/communities/${coummunity.name}`}
							className={`community ${
								decodeURI(pathname).includes(coummunity.name) ? 'active' : ''
							}`}
							key={index}
						>
							<p>{coummunity.name}</p>
							{coummunity.badge !== 0 && <div className="badge">{coummunity.badge}</div>}
						</Link>
					))}
				</div>
			</div>
			<div className="manager">
				<div className="title">
					<ManageAccountsIcon />
					Manager
				</div>
				<div className="content">
					<Link to="/settings" className="settings">
						Settings
					</Link>
				</div>
			</div>
			<div className="profile">
				<div className="user-information">
					<Avatar src="/images/avatar.png" />
					<div className="user-detail">
						<p className="username">Pablo</p>
						<p className="twitter-id">@pablolefleur</p>
					</div>
				</div>
				<WalletMultiButton />
			</div>
		</aside>
	)
}

export default Sidebar
