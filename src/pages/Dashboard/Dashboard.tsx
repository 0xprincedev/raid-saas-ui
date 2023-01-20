import MainLayout from 'layouts/MainLayout'

const Dashboard = () => {
	return (
		<MainLayout title="Dashboard" className="dashboard">
			<div className="container">
				<div className="dashboard">
					<h1 className="title">Dashboard</h1>
					<div className="content">
						<div className="content-wrapper">
							<p className="text-primary">Total Earnings</p>
							<h2>
								350 <span>SOL</span>
							</h2>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default Dashboard
