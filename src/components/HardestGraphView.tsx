import { PieChart } from 'react-minimal-pie-chart'
import ColorBlock from './ColorBlock'

interface Props {
	title: string
}

const HardestGraphView = ({ title }: Props) => {
	return (
		<div className="hardestGraphView-component content-wrapper">
			<h6 className="text-primary">{title}</h6>
			<div className="chart-view">
				<PieChart
					data={[
						{ title: 'DeGods', value: 50, color: '#F047FF' },
						{ title: 'Okay Bears', value: 15, color: '#00D415' },
						{ title: 'y00ts', value: 35, color: '#FCD676' },
					]}
					startAngle={90}
					lineWidth={20}
				/>
				<div className="item-wrapper">
					<div className="item">
						<ColorBlock width="5px" height="11px" color="#F047FF" />
						<span>{'DeGods'}</span>
					</div>
					<div className="item">
						<ColorBlock width="5px" height="11px" color="#00D415" />
						<span>{'Okay Bears'}</span>
					</div>
					<div className="item">
						<ColorBlock width="5px" height="11px" color="#FCD676" />
						<span>{'y00ts'}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HardestGraphView
