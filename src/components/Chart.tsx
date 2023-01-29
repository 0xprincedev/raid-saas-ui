import { useMemo } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'

interface Props {
	type?: string
	data: number[]
}

const Chart = ({ type = 'area', data }: Props) => {
	const chartData = useMemo(() => {
		return data.map((item, index) => {
			return { value: item, timestamp: index }
		})
	}, [data])

	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart data={chartData}>
				<defs>
					<linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#F047FF" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#F047FF" stopOpacity={0} />
					</linearGradient>
				</defs>
				<Tooltip wrapperStyle={{ outline: 'none' }} />
				<Area
					type="monotone"
					dataKey="value"
					stroke="#F047FF"
					fillOpacity={1}
					fill="url(#colorPrice)"
				/>
			</AreaChart>
		</ResponsiveContainer>
	)
}

export default Chart
