import { useId } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

interface Props {
	component?: 'input' | 'textarea'
	variant?: 'outlined' | 'filled' | 'standard'
	input: any
	meta: any
	label?: string
	name?: string
	placeholder?: string
	required?: boolean
	data?: Record<string, any>[]
	pipe?: (arg: string | number) => void
}

const SelectForm = (props: Props) => {
	const {
		variant = 'outlined',
		input,
		label,
		name,
		placeholder = '',
		required,
		data,
		pipe,
	} = props

	const id = useId()

	const handleInputChange = (event: SelectChangeEvent) => {
		input.onChange(pipe ? pipe(event.target.value) : event.target.value)
	}

	return (
		<FormControl fullWidth>
			<InputLabel id={id}>{label}</InputLabel>
			<Select
				id={id}
				variant={variant}
				label={label}
				name={name}
				placeholder={placeholder}
				required={required}
				onChange={handleInputChange}
			>
				<MenuItem></MenuItem>
				{data?.map((item, index) => (
					<MenuItem value={item.value} key={index}>
						{item.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default SelectForm
