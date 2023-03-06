import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import MainLayout from 'layouts/MainLayout'
import Raid from "components/Raid"
import TotalTableView from "components/TotalTableView"
import TotalView from "components/TotalView"

import { communityRegex } from 'constant'

import { activeRaids, topCommunitiyMembers } from "__mockup__"

const Communities = () => {
	const { pathname } = useLocation()

	const communityId = useMemo(() => {
		const match = pathname.match(communityRegex)
		if (match && match.length > 1) {
			return match[1]
		}
	}, [pathname])

	useEffect(() => {}, [communityId])

	return (
		<MainLayout title="Communities" className="community">
			<div className="container">
				<div className="community">
					<h1 className="title text-gradient">Dashboard</h1>
					<div className="content">
						<div className="overview">
							<TotalView
								title="Total Community Earnings"
								value={5000}
								unit="SOL"
								data={[1, 2, 6, 3, 1, 2]}
								delta={7.5}
							/>
							<TotalView
								title="Total Community Raids"
								value={300}
								data={[1, 2, 3, 4, 6, 3, 1, 3]}
								delta={2.56}
							/>
							<TotalView
								title="Average Views per Tweet "
								value={5607}
								data={[1, 2, 3, 4, 6, 3, 1, 3]}
								delta={-8.6}
							/>
							<TotalTableView data={topCommunitiyMembers} />
						</div>
					</div>
				</div>
				<div className="active-raids">
					<h1 className="title text-gradient">Community Raids</h1>
					<div className="content">
						{activeRaids.map((raid, index) => (
							<Raid data={raid} key={index} />
						))}
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default Communities
