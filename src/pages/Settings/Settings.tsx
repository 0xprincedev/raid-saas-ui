import { useState } from 'react'
import Button from '@mui/material/Button'

import MainLayout from 'layouts/MainLayout'
import Account from './Sections/Account'
import History from './Sections/History'
import ManageCommunities from './Sections/ManageCommunities'

const Settings = () => {
	const [status, setStatus] = useState<number>(0)

	const handleClick = (_status: number) => {
		setStatus(_status)
	}

	return (
		<MainLayout title="Raid Saas - Settings" className="settings">
			<div className="container">
				<h1 className="title text-gradient">Settings</h1>
				<div className="content content-wrapper">
					<div className="button-group">
						<Button
							className={status === 0 ? 'active' : ''}
							onClick={() => handleClick(0)}
						>
							Account
						</Button>
						<Button
							className={status === 1 ? 'active' : ''}
							onClick={() => handleClick(1)}
						>
							History
						</Button>
						<Button
							className={status === 2 ? 'active' : ''}
							onClick={() => handleClick(2)}
						>
							Manage Communities
						</Button>
					</div>
					{status === 0 ? (
						<Account />
					) : status === 1 ? (
						<History />
					) : status === 2 ? (
						<ManageCommunities />
					) : (
						<></>
					)}
				</div>
			</div>
		</MainLayout>
	)
}

export default Settings
