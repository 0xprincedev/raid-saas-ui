import { useState } from 'react'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { shortenAddress } from 'utils'
import CommunityInfoEditModal from 'components/Modal/CommunityInfoEditModal'
import { useAppSelector } from "app/hooks"
import { RootState } from "app/store"

const ManageCommunities = () => {
	const [communityInfoEditModal, setCommunityInfoEditModal] = useState<boolean>(false)
	const [communityData, setCommunityData] = useState<any>({})
	// @ts-ignore
	const myCommunities = useAppSelector((state: RootState) => state.user.communities) 

	const handleEditCommunity = (index: number) => {
		setCommunityData(myCommunities[index])
		setCommunityInfoEditModal(true)
	}

	return (
		<>
			<section className="manage-communities">
				<CommunityInfoEditModal
					open={communityInfoEditModal}
					data={communityData}
					closeModal={() => setCommunityInfoEditModal(false)}
				/>
				<div className="settings-group">
					<div className="community-settings">
						<h4>Community Settings</h4>
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Logo</TableCell>
										<TableCell align="left">Community Name</TableCell>
										<TableCell align="center">Twitter</TableCell>
										<TableCell align="center">Discord</TableCell>
										<TableCell align="right"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{myCommunities?.map((item:any, index:number) => (
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={item._id}>
												<TableCell component="th" scope="row">
													<img src={item.logo} alt="logo" />
												</TableCell>
												<TableCell align="left">{item.name}</TableCell>
												<TableCell align="center">{item.twitterLink}</TableCell>
												<TableCell align="center">{item.discordLink}</TableCell>
												<TableCell align="right">
													<Button onClick={() => handleEditCommunity(index)}>Edit</Button>
												</TableCell>
											</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
					<div className="collection-settings">
						<h4>Collection Settings</h4>
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="left" colSpan={3}>
											<p className="description">
												Members must hold at least 1 NFT from your linked collections
											</p>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{myCommunities?.map((item: any) => (
										<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={item._id}>
											<TableCell>{item.nftCollection.name}</TableCell>
											<TableCell align="left">{item.nftCollection.count}</TableCell>
											<TableCell align="right">
												<Button>Unlink</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<Button className="btn-border-gradient add-collection">
							<span className="btn__label">Add Collection</span>
						</Button>
					</div>
					<div className="booking-fees">
						<h4>Booking Fees</h4>
						<div className="bookings">
							<TableContainer component={Paper}>
								<Table aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell align="left">Fee Treasury</TableCell>
											<TableCell align="left">Fee %</TableCell>
											<TableCell align="left">Total Fees Earned</TableCell>
											<TableCell align="right"></TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
											<TableCell>
												{shortenAddress('4FBqjSUBsYrkV2nSaSQ2fiythmSXRrQhXX3bN1A34M6R')}
											</TableCell>
											<TableCell align="left">
												{shortenAddress('4FBqjSUBsYrkV2nSaSQ2fiythmSXRrQhXX3bN1A34M6R')}
											</TableCell>
											<TableCell align="left">{(20000).toLocaleString()} SOL</TableCell>
											<TableCell align="right">
												<Button>Unlink</Button>
											</TableCell>
										</TableRow>

										<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
											<TableCell>
												{shortenAddress('4FBqjSUBsYrkV2nSaSQ2fiythmSXRrQhXX3bN1A34M6R')}
											</TableCell>
											<TableCell align="left">
												{shortenAddress('4FBqjSUBsYrkV2nSaSQ2fiythmSXRrQhXX3bN1A34M6R')}
											</TableCell>
											<TableCell align="left">{(20000).toLocaleString()} SOL</TableCell>
											<TableCell align="right">
												<Button>Unlink</Button>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</div>
				</div>
			</section>

			<div className="billing-due">
				<div>
					<button>
						<p>Next Bill Due:</p>{myCommunities[0]?.nftCollection.lastBilledDate}
					</button>
					<button>
						<p>Total Due:</p>2.5 SOL
					</button>
				</div>
			</div>
		</>
	)
}

export default ManageCommunities
