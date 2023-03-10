import { useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import UploadIcon from '@mui/icons-material/Upload'
import { toast } from "react-toastify"

import ImageDropzone from 'components/ImageDropzone'
import InputForm from 'components/Form/InputForm'

import { updateCommunity } from "slices/user"
import { useAppDispatch } from "app/hooks"
import { convertToBase64 } from "utils"

interface Props {
	open: boolean
	data: any
	closeModal: () => void
}

const CommunityInfoEditModal = (props: Props) => {
	const { open, closeModal } = props
	const [file, setFile] = useState<any>(null)
	const dispatch = useAppDispatch()

	const { _id, name, logo, twitterLink, discordLink } = props.data

	const handleUpdate = async (data: any) => {
		let updatedLogo: any

		if (file) {
			if (file.size > 1024 * 100) {
				return toast.warning('Maximum logo size is 100kb!')
			}
			updatedLogo = await convertToBase64(file)
		} else {
			updatedLogo = logo
		}

		const result = await dispatch(updateCommunity({ id: _id, logo: updatedLogo.toString(), communityName: data.communityName, twitterLink: data.twitter, discordLink: data.discord }))
		if(result.payload.success) {
			toast.success(`${result.payload.messege}`)
		}
		closeModal()
	}

	return (
		<Modal open={open} onClose={closeModal}>
			<div className="modal modal__community-info-edit">
				<div className="modal__content">
					<Form
						onSubmit={handleUpdate}
						render={({ handleSubmit }) => (
							<form onSubmit={handleSubmit} autoComplete="off" className="form">
								<div className="form__body">
									<div className="select-image">
										<ImageDropzone defaultImage={logo} setFile={setFile} />
										<div
											className="click-to-upload"
											title="Click to upload image for avatar"
										>
											<UploadIcon fontSize="large" />
										</div>
									</div>
									<Field name="communityName" label="Community Name" required>
										{(props) => <InputForm defaultValue={name} {...props} />}
									</Field>
									<Field name="twitter" label="Twitter" required>
										{(props) => <InputForm defaultValue={twitterLink} {...props} />}
									</Field>
									<Field name="discord" label="Discord" required>
										{(props) => <InputForm defaultValue={discordLink} {...props} />}
									</Field>
									<div className="form__footer">
										<Button type="submit" variant="contained">
											Update
										</Button>
										<Button onClick={closeModal}>Cancel</Button>
									</div>
								</div>
							</form>
						)}
					/>
				</div>
			</div>
		</Modal>
	)
}

export default CommunityInfoEditModal
