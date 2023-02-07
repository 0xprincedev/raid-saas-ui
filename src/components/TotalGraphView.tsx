import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'

interface Props {
	title?: string
	value: number
	delta: number
}

const TotalGraphView = ({ title, value, delta }: Props) => {
	return (
		<div className="totalGraphView-component content-wrapper">
			<h6 className="text-primary">{title}</h6>
			<div className="chart-view">
				<div>
					<CircularProgressbar
						value={value}
						className="progressbar"
						styles={{
							path: {
								stroke: '#F047FF',
							},
							text: {
								fontSize: '24px',
								fontWeight: 700,
							},
						}}
					/>
					<span>{value}%</span>
				</div>
				<span className="delta">
					{delta < 0 ? (
						<SouthIcon sx={{ color: '#C83838' }} fontSize="small" />
					) : (
						<NorthIcon sx={{ color: '#00D415' }} fontSize="small" />
					)}
					{Math.abs(delta)}%
				</span>
			</div>
		</div>
	)
}

export default TotalGraphView
