import { useEffect, useState } from 'react'
import { Button, Modal, TextField } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import ImageDropzone from 'components/ImageDropzone'
import { apiUpdateUserProfile } from 'utils/user'
import { getUserProfile } from 'slices/userSlice'

interface Props {
	open: boolean
	closeModal: () => void
}

const UserInfoEditModal = (props: Props) => {
	const { open, closeModal } = props
	const _username = useAppSelector((state: RootState) => state.userSlice.username)
	const _twitterId = useAppSelector((state: RootState) => state.userSlice.twitterId)
	const [file, setFile] = useState<any>(null)
	const [username, setUsername] = useState<string>()
	const [twitterId, setTwitterId] = useState<string>()
	const dispatch = useAppDispatch()
	const walletAddress = useAppSelector(
		(state: RootState) => state.userSlice.walletAddress
	)

	useEffect(() => {
		setUsername(_username)
		setTwitterId(_twitterId)
	}, [_username, _twitterId])

	const handleSubmit = async () => {
		if (username === '' || twitterId === '') {
			toast.error('Invalid params')
			return
		}
		try {
			await apiUpdateUserProfile({ username, twitterId, walletAddress })
			await dispatch(getUserProfile(walletAddress))
			toast.success('Updated successfully')
			closeModal()
		} catch (err: any) {
			toast.error(err.message)
		}
	}

	return (
		<Modal open={open} onClose={closeModal}>
			<div className="modal-content user-info-edit-modal">
				<div className="select-image">
					<ImageDropzone defaultImage="/images/avatar.png" setFile={setFile} />
					<div className="click-to-upload" title="Click to upload image for avatar">
						<UploadIcon fontSize="large" />
					</div>
				</div>
				<div className="input-group">
					<TextField
						label="Username"
						variant="outlined"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						label="Twitter ID"
						variant="outlined"
						value={twitterId}
						onChange={(e) => setTwitterId(e.target.value)}
					/>
					<Button
						variant="contained"
						sx={{ textTransform: 'uppercase' }}
						onClick={handleSubmit}
					>
						Update
					</Button>
					<Button
						variant="outlined"
						sx={{ textTransform: 'uppercase' }}
						onClick={closeModal}
					>
						Cancel
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default UserInfoEditModal
