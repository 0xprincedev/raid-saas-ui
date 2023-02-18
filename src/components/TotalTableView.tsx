interface Props {
	data: {
		title: string
		keys: string[]
		values: (string | number)[][]
	}
}

const TotalTableView = ({ data }: Props) => {
	return (
		<div className="totalTableView-component content-wrapper">
			<h6 className="text-primary">{data?.title}</h6>
			<table>
				<thead>
					<tr>
						{data.keys.map((key) => (
							<th key={key}>{key}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.values.map((value, index) => (
						<tr key={index}>
							<td>{value[0]}</td>
							<td>
								<p>
									{value[1]}
									{value[3] > 0 ? (
										<span className="up">+{value[3]}</span>
									) : value[3] < 0 ? (
										<span className="down">{value[3]}</span>
									) : (
										''
									)}
								</p>
							</td>
							<td>
								{value[2].toLocaleString()}
								<span>{value?.[4]}</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TotalTableView
