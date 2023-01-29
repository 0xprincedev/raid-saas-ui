import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'

import Chart from './Chart'

interface Props {
	title: string
	value: number
	unit?: string
	data: number[]
	delta?: number
}

const TotalView = ({ title, value, unit = '', data, delta = 0 }: Props) => {
	return (
		<div className="content-wrapper totalView-component">
			<h6 className="text-primary">{title}</h6>
			<h2>
				{value} <span>{unit}</span>
			</h2>
			<div className="chart-view">
				<div className="chart-data">
					<Chart data={data} />
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

export default TotalView
