import HardestGraphView from 'components/HardestGraphView'
import TotalTableView from 'components/TotalTableView'
import MainLayout from 'layouts/MainLayout'

import { topRadiers } from '__mockup__'

const Leaderborad = () => {
	return (
		<MainLayout title="Dashboard" className="dashboard">
			<div className="container">
				<div className="dashboard">
					<h1 className="title text-gradient">Leaderboard</h1>
					<div className="content">
						<div className="overview">
							<TotalTableView data={topRadiers} />
							<HardestGraphView title="Hardest Raiding Community" />
						</div>
					</div>
				</div>
				<div className="active-raids">
					<h1 className="title text-gradient">Community Leaderboards</h1>
					<div className="content">
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default Leaderborad
