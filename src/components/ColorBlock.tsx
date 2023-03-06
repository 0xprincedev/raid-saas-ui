import React from 'react'

interface Props {
	width: string
	height: string
	color: string
}

const ColorBlock = ({ width, height, color }: Props) => {
	return <div style={{ width: width, height: height, backgroundColor: color }}></div>
}

export default ColorBlock
