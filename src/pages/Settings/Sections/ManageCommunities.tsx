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

const ManageCommunities = () => {
	const [communityInfoEditModal, setCommunityInfoEditModal] = useState<boolean>(false)

	const handleEditCommunity = () => {
		setCommunityInfoEditModal(true)
	}

	return (
		<>
			<section className="manage-communities">
				<CommunityInfoEditModal
					open={communityInfoEditModal}
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
										<TableCell align="right">Twitter</TableCell>
										<TableCell align="right">Discord</TableCell>
										<TableCell align="right"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component="th" scope="row">
											<img src="/images/looties.png" alt="" />
										</TableCell>
										<TableCell align="left">{`y00ts`}</TableCell>
										<TableCell align="right">{`@y00ts`}</TableCell>
										<TableCell align="right">{`/y00ts`}</TableCell>
										<TableCell align="right">
											<Button onClick={handleEditCommunity}>Edit</Button>
										</TableCell>
									</TableRow>
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
									<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell>{`y00ts`}</TableCell>
										<TableCell align="left">{`205`}</TableCell>
										<TableCell align="right">
											<Button>Unlink</Button>
										</TableCell>
									</TableRow>
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
						<p>Next Bill Due:</p>2/30/2023
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
