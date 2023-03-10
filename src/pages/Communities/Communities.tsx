import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import MainLayout from 'layouts/MainLayout'
import Raid from "components/Raid"
import TotalTableView from "components/TotalTableView"
import TotalView from "components/TotalView"

import { communityRegex } from 'constant'

import { topCommunitiyMembers } from "__mockup__"
import { apiGetRaid } from "utils/raid"
import { apiGetTwitterInfo } from "utils/twitter"
import { useAppSelector } from "app/hooks"
import { RootState } from "app/store"

const Communities = () => {
	const { pathname } = useLocation()
	const [displayDatas, setDisplayDatas] = useState<any[]>([])
	const [communityRaids, setCommunityRaids] = useState<any[]>([])
	// @ts-ignore
	const user = useAppSelector((state: RootState) => state.user.user)

	const communityId = useMemo(() => {
		const match = pathname.match(communityRegex)
		if (match && match.length > 1) {
			return match[1]
		}
	}, [pathname])

	const getRaids = async(communityId: string) => {
		const result: any = await apiGetRaid(communityId)
		setCommunityRaids(result.data)
	}	

	const getTwitterInfo = async (communityRaids: any) => {
		const filteredRaids = []
		for (const element of communityRaids) {
			const { data: twitterInfo } = await apiGetTwitterInfo(element.tweetId)
			const temp = {
				userId: user._id,
				raidId: element._id,
				twitterId: element.tweetId,
				avatar: element.user?.avatar,
				twitterDisplayName: element.user?.twitterDisplayName,
				twitterUserName: element.user?.twitterUserName,
				communityName: element.community.name,
				raidStatus: false,
				twitterContent: twitterInfo.data,
				requiredWords: element.requiredWords,
				ineligibleWords: element.ineligibleWords
			}
			filteredRaids.push(temp)
		}
		
		setDisplayDatas(filteredRaids)	
	}

	useEffect(() => {
		if (!communityId) {
			return
		}
		getRaids(communityId)
	}, [communityId])

	useEffect(() => {
		if (!communityRaids.length) {
			return
		}
		
		getTwitterInfo(communityRaids)
	}, [communityRaids])

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
						{displayDatas.map((raid, index) => (
							<Raid data={raid} key={index} />
						))}
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default Communities
