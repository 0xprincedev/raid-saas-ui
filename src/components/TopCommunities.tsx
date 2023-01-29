import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import Chart from './Chart'

const topCommunities = [
	{
		logo: '/images/looties.png',
		name: 'y00ts',
		rank: 1,
		avgViewsPerRaid: 5000,
		viewsPerRaid: [0, 2, 1, 6, 4, 9, 8],
		totalCommunityRaids: 5000,
		communityRaids: [0, 2, 1, 6, 4, 9, 8],
	},
	{
		logo: '/images/looties.png',
		name: 'Okay Bears ',
		rank: 5,
		avgViewsPerRaid: 5000,
		viewsPerRaid: [0, 2, 1, 6, 4, 9, 8],
		totalCommunityRaids: 5000,
		communityRaids: [0, 2, 1, 6, 4, 9, 8],
	},
	{
		logo: '/images/looties.png',
		name: 'Jelly Esports',
		rank: 10,
		avgViewsPerRaid: 5000,
		viewsPerRaid: [0, 2, 1, 6, 4, 9, 8],
		totalCommunityRaids: 5000,
		communityRaids: [0, 2, 1, 6, 4, 9, 8],
	},
]

const TopCommunities = () => {
	return (
		<div className="content-wrapper top-communities-component">
			<p className="title text-gradient">
				<KeyboardDoubleArrowRightIcon fontSize="large" />
				Top Communities
			</p>
			{topCommunities.map((community, index) => (
				<div className="community" key={index}>
					<div className="community__header">
						<img src={community.logo} alt="" />
						<span className="name">{community.name}</span>
						<div className={community.rank === 1 ? 'first-rank' : ''}>
							Rank {community.rank}
						</div>
					</div>
					<div className="community__body">
						<div>
							<div className="left-section">
								<p>Avg Views per raid</p>
								<span>{community.avgViewsPerRaid.toLocaleString()}</span>
							</div>
							<div className="chart">
								<Chart data={community.viewsPerRaid} />
							</div>
						</div>
						<div>
							<div className="left-section">
								<p>Total Community Raids</p>
								<span>{community.totalCommunityRaids.toLocaleString()}</span>
							</div>
							<div className="chart">
								<Chart data={community.communityRaids} />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default TopCommunities
