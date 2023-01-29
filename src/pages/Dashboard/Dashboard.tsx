import MainLayout from 'layouts/MainLayout'
import TotalView from 'components/TotalView'
import TotalGraphView from 'components/TotalGraphView'

const Dashboard = () => {
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
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default Dashboard
