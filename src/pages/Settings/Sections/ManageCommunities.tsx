import { useState } from 'react'
import Button from '@mui/material/Button'

import { shortenAddress } from 'utils'
import CommunityInfoEditModal from 'components/Modal/CommunityInfoEditModal'

const ManageCommunities = () => {
	const [communityInfoEditModal, setCommunityInfoEditModal] = useState<boolean>(false)

	const handleEditCommunity = () => {
		setCommunityInfoEditModal(true)
	}

	return (
		<section className="manage-communities">
			<CommunityInfoEditModal
				open={communityInfoEditModal}
				closeModal={() => setCommunityInfoEditModal(false)}
			/>
			<div className="community-settings">
				<h4>Community Settings</h4>
				<div>
					<div>
						<img src="/images/looties.png" alt="" />
						y00ts
					</div>
					<p>Twitter: @y00ts</p>
					<p>Discord: /y00ts</p>
					<Button onClick={handleEditCommunity}>Edit</Button>
				</div>
			</div>
			<div className="collection-settings">
				<h4>Collection Settings</h4>
				<p className="description">
					Members must hold at least 1 NFT from your linked collections
				</p>
				<div className="collections">
					<div className="collection">
						<p className="name">y00ts</p>
						<p className="numbers">205</p>
						<Button>Unlink</Button>
					</div>
					<div className="collection">
						<p className="name">y00ts</p>
						<p className="numbers">205</p>
						<Button>Unlink</Button>
					</div>
				</div>
				<Button className="btn-border-gradient add-collection">
					<span className="btn__label">Add Collection</span>
				</Button>
			</div>
			<div className="booking-fees">
				<h4>Booking Fees</h4>
				<div className="bookings">
					<div className="menu">
						<p>Fee Treasury</p>
						<p>Fee %</p>
						<p>Total Fees Earned</p>
					</div>
					<div className="booking">
						<p className="address">
							{shortenAddress('4FBqjSUBsYrkV2nSaSQ2fiythmSXRrQhXX3bN1A34M6R')}
						</p>
						<p className="fee">5%</p>
						<p className="total-fees-earned">{(20000).toLocaleString()} SOL</p>
						<Button>Edit</Button>
					</div>
					<div className="booking">
						<p className="address">
							{shortenAddress('4FBqjSUBsYrkV2nSaSQ2fiythmSXRrQhXX3bN1A34M6R')}
						</p>
						<p className="fee">5%</p>
						<p className="total-fees-earned">{(20000).toLocaleString()} SOL</p>
						<Button>Edit</Button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ManageCommunities
