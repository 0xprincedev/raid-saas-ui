interface Props {
	data: {
		imgUrl: string
		communityName: string
		username: string
		twitterId: string
		description: string
		raidLeft: number
		value: number
		isFavorite: boolean
		isRetweet: boolean
	}
}

const Raid = (props: Props) => {
	const { data } = props
	return <div className="content-wrapper"></div>
}

export default Raid
