import { useEffect, useState } from "react"
import MainLayout from 'layouts/MainLayout'
import TotalView from 'components/TotalView'
import TotalGraphView from 'components/TotalGraphView'
import TotalTableView from 'components/TotalTableView'
import Raid from 'components/Raid'

import { topCommunities } from '__mockup__'
import { activeRaids } from '__mockup__'

import { apiGetRaid } from "utils/raid"
import { apiGetTwitterInfo } from "utils/twitter"
import { setIsCreateAccountModalOpen } from "slices/user"
import { useAppDispatch } from "app/hooks"

const Dashboard = () => {
	// const [activeRaids, setActiveRaids] = useState<any[]>([])
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(setIsCreateAccountModalOpen(false))
		
		const getRaids = async() => {
			const result = await apiGetRaid()
			console.log('all raids', result)
			const twitterInfo = await apiGetTwitterInfo('1628349254098997251')
			
			console.log('twitterInfo', twitterInfo)
			// setActiveRaids(result.data)
		}	
		getRaids()
	}, [])

	return (
		<MainLayout title="Dashboard" className="dashboard">
			<div className="container">
				<div className="dashboard">
					<h1 className="title text-gradient">Dashboard</h1>
					<div className="content">
						<div className="overview">
							<TotalView
								title="Total Earnings"
								value={350}
								unit="SOL"
								data={[1, 2, 6, 3, 1, 2]}
								delta={-2.5}
							/>
							<TotalView
								title="Total Raids"
								value={103}
								data={[1, 2, 3, 4, 6, 3, 1, 3]}
								delta={7.5}
							/>
							<TotalGraphView title="Raid Success Rate" value={77} delta={7.5} />
							<TotalTableView data={topCommunities} />
						</div>
					</div>
				</div>
				<div className="active-raids">
					<h1 className="title text-gradient">Active Raids</h1>
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

export default Dashboard