import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import Button from '@mui/material/Button'

interface Props {
	data: {
		avatar?: string
		twitterDisplayName?: string
		twitterUserName?: string
		twitterContent?: string
		raidsLeft?: number
		value?: number
		communityName?: string
		raidStatus?: boolean
	}
}

const Raid = ({ data }: Props) => {
	return (
		<div className="content-wrapper raid-component">
			<div className="raid__header">
				<div className="user-info">
					<img src={data.avatar} alt="" />
					<div>
						<p>{data.twitterDisplayName}</p>
						<span>{data.twitterUserName}</span>
					</div>
				</div>
				<div className="raid-info">
					<div className="community-name">{data.communityName}</div>
					<div className="status">{data.raidStatus ? 'Incomplete' : 'complete'}</div>
				</div>
			</div>
			<div className="raid__body">
				<p>{data.twitterContent}</p>
			</div>
			<div className="raid__footer">
				<div className="button-group">
					<IconButton size="small" sx={{ backgroundColor: 'var(--success)' }}>
						<FavoriteIcon fontSize="small" sx={{ fill: '#FFF' }} />
					</IconButton>
					<IconButton size="small" sx={{ backgroundColor: 'var(--success)' }}>
						<AutorenewIcon fontSize="small" sx={{ fill: '#FFF' }} />
					</IconButton>
					<Button className="comment">Comment</Button>
				</div>
			</div>
		</div>
	)
}

export default Raid
