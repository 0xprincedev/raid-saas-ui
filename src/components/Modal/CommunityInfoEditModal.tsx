import { useState } from 'react'
import { Field, Form } from 'react-final-form'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import UploadIcon from '@mui/icons-material/Upload'

import ImageDropzone from 'components/ImageDropzone'
import InputForm from 'components/Form/InputForm'

interface Props {
	open: boolean
	closeModal: () => void
}

const CommunityInfoEditModal = (props: Props) => {
	const { open, closeModal } = props
	const [file, setFile] = useState<any>(null)

	const handleUpdate = () => {}

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
										<ImageDropzone defaultImage="/images/looties.png" setFile={setFile} />
										<div
											className="click-to-upload"
											title="Click to upload image for avatar"
										>
											<UploadIcon fontSize="large" />
										</div>
									</div>
									<Field name="communityName" label="Community Name" required>
										{(props) => <InputForm {...props} />}
									</Field>
									<Field name="twitter" label="Twitter" required>
										{(props) => <InputForm {...props} />}
									</Field>
									<Field name="discord" label="Discord" required>
										{(props) => <InputForm {...props} />}
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
