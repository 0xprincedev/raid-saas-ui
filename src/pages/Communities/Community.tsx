import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, IconButton, Tab, Tabs } from '@mui/material'

import { raid, tweet } from 'config'
import MainLayout from 'layouts/MainLayout'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AutorenewIcon from '@mui/icons-material/Autorenew'

const Community = () => {
	const [value, setValue] = useState<number>(0)
	const { community } = useParams()

	const handleChangeValue = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<MainLayout title={`Community - ${community}`} className="community">
			<div className="container">
				<Tabs value={value} onChange={handleChangeValue} centered>
					<Tab label="Create Raid" />
					<Tab label="Raid" />
				</Tabs>
				<div className="content">
					{value === 0 ? (
						<div className="create-a-raid">
							<h1 className="title">Create a raid</h1>
							<div className="raids">
								{Array(10)
									.fill(0)
									.map((item, index) => (
										<div className="raid" key={index}>
											<div className="image">
												<img src={raid.imgURL} alt="" />
												<span>{raid.name}</span>
											</div>
											<div className="reward">
												<span>Reward: </span>
												{`${raid.reward} ${raid.unit}`}
											</div>
											<Button sx={{ color: '#FFF' }}>Post a Tweet</Button>
											<Button sx={{ color: '#FFF', marginLeft: '8px' }}>
												Generate Tweet
											</Button>
										</div>
									))}
							</div>
						</div>
					) : (
						<div className="tweets-to-raid">
							<h1 className="title">{community}</h1>
							<div className="tweets">
								{Array(10)
									.fill(0)
									.map((item, index) => (
										<div className="tweet" key={index}>
											<div className="tweet-body">
												<div className="tweet-content">
													<div className="user-profile">
														<img src={tweet.avatar} alt="" />
														{tweet.username}
													</div>
													<p className="tweet-description">{tweet.description}</p>
												</div>
												<img src={tweet.imgURL} alt="" className="tweet-image" />
											</div>
											<div className="tweet-footer">
												<IconButton title="Add to Favorite">
													<FavoriteBorderIcon />
												</IconButton>
												<IconButton>
													<AutorenewIcon />
												</IconButton>
												<Button sx={{ color: '#FFF' }}>Comment</Button>
											</div>
										</div>
									))}
							</div>
						</div>
					)}
				</div>
			</div>
		</MainLayout>
	)
}

export default Community
