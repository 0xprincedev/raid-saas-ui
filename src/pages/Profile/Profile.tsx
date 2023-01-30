import { useState } from 'react'
import Button from '@mui/material/Button'
import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'

import MainLayout from 'layouts/MainLayout'
import TopCommunities from 'components/TopCommunities'

const avgEngagements = {
	likes: {
		count: 632,
		delta: 7.5,
	},
	retweets: {
		count: 502,
		delta: -5.2,
	},
	comments: {
		count: 356,
		delta: 0,
	},
}

const Profile = () => {
	const [status, setStatus] = useState<number>(0)

	const handleClick = (_status: number) => {
		setStatus(_status)
	}

	return (
		<MainLayout title="Raid Saas - Profile" className="profile" sidebarType={1}>
			<div className="container">
				<div>
					<div className="profile">
						<h1 className="title text-gradient">Profile</h1>
						<div className="content">
							<div className="content-wrapper average-engagement">
								<h6 className="text-primary">Average Engagement per Campaign</h6>
								<div className="engagements">
									{Object.keys(avgEngagements).map((key, index) => (
										<div className="engagement">
											<p>{key}</p>
											<span>{(avgEngagements as any)[key].count}</span>
											<div>
												{(avgEngagements as any)[key].delta > 0 ? (
													<NorthIcon color="success" />
												) : (avgEngagements as any)[key].delta < 0 ? (
													<SouthIcon color="error" />
												) : (
													<></>
												)}
												{(avgEngagements as any)[key].delta === 0
													? '-'
													: Math.abs((avgEngagements as any)[key].delta) + '%'}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="campaign-history">
						<h1 className="title text-gradient">Campaign History</h1>
						<div className="content content-wrapper">
							<div className="button-group">
								<Button
									className={`${status === 0 ? 'active' : ''}`}
									onClick={() => handleClick(0)}
								>
									Active
								</Button>
								<Button
									className={`${status === 1 ? 'active' : ''}`}
									onClick={() => handleClick(1)}
								>
									Past
								</Button>
							</div>
							<div className="table scrollbar">
								<table>
									<thead>
										<tr>
											<th>Campaign</th>
											<th>Raids Remaining</th>
											<th>Tweet Views</th>
											<th>Likes</th>
											<th>Retweets</th>
											<th>Comments</th>
										</tr>
									</thead>
									<tbody>
										{Array(3)
											.fill(0)
											.map((item, index) => (
												<tr key={index}>
													<td>
														<div>
															Tweet Raid
															<span>2d</span>
														</div>
														<p>150 Raids</p>
													</td>
													<td>76</td>
													<td>{(5600).toLocaleString()}</td>
													<td>{(256).toLocaleString()}</td>
													<td>{(204).toLocaleString()}</td>
													<td>{(178).toLocaleString()}</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<TopCommunities />
			</div>
		</MainLayout>
	)
}

export default Profile
