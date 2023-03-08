import { useEffect, useState } from "react"
import MainLayout from 'layouts/MainLayout'
import TotalView from 'components/TotalView'
import TotalGraphView from 'components/TotalGraphView'
import TotalTableView from 'components/TotalTableView'
import Raid from 'components/Raid'

import { topCommunities } from '__mockup__'

import { apiGetRaid } from "utils/raid"
import { apiGetTwitterInfo } from "utils/twitter"
import { setIsCreateAccountModalOpen } from "slices/user"
import { useAppDispatch } from "app/hooks"

const Dashboard = () => {
	const [displayDatas, setDisplayDatas] = useState<any[]>([])
	const [allRaids, setAllRaids] = useState<any[]>([])
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(setIsCreateAccountModalOpen(false))
		getRaids()
	}, [])

	const getRaids = async() => {
		const result: any = await apiGetRaid('')
		setAllRaids(result.data)
	}	

	const getTwitterInfo = async (allRaids: any) => {
		const filteredRaids = []
		for (const element of allRaids) {
			const { data: twitterInfo } = await apiGetTwitterInfo(element.tweetId)
			const temp = {
				avatar: element.user.avatar,
				twitterDisplayName: element.user.twitterDisplayName,
				twitterUserName: element.user.twitterUserName,
				communityName: element.community.name,
				raidStatus: false,
				twitterContent: twitterInfo.data,
			}
			filteredRaids.push(temp)
		}
		
		setDisplayDatas(filteredRaids)	
	}

	useEffect(() => {
		if (!allRaids.length) {
			return
		}
		
		getTwitterInfo(allRaids)
	}, [allRaids])

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
						{displayDatas.map((raid, index) => (
							<Raid data={raid} key={index} />
						))}
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default Dashboard