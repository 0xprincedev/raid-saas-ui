import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'

const History = () => {
	return (
		<section className="history">
			<h4>Payout History</h4>
			{Array(10)
				.fill(0)
				.map((item, index) => (
					<div className="payout-history" key={index}>
						<p>
							Payout Sent
							<br />
							<span>2d ago</span>
						</p>
						<span className="amount">+ 0.0267 SOL</span>
						<span className="link">
							<ArrowOutwardIcon />
							View
						</span>
					</div>
				))}
		</section>
	)
}

export default History
