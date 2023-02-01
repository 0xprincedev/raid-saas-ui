import { useState } from 'react'
import { Field, Form } from 'react-final-form'
import Button from '@mui/material/Button'

import MainLayout from 'layouts/MainLayout'
import InputForm from 'components/Form/InputForm'
import ImageDropzone from 'components/ImageDropzone'

const CreateCommunity = () => {
	const [status, setStatus] = useState<number>(0)
	const [file, setFile] = useState<any>(null)

	const handleClick = () => {
		setStatus(1)
	}

	const handleCreateCommunity = () => {}

	return (
		<MainLayout title="Raid Saas - Create Community" className="create-community">
			<div className="container">
				<h1 className="title text-gradient">Create Community</h1>
				<div className="content content-wrapper">
					{status === 0 ? (
						<div className="select-your-plan">
							<h1 className="title text-gradient">
								Lorem ipsum dolor sit amet, consectetur
							</h1>
							<p className="description">
								Try every feature with a <b>30-day free trial</b>. No payment required.
							</p>
							<div className="plans">
								<div className="plan">
									<p className="plan__title">Monthly Plan</p>
									<p className="plan__description">Pay as you go</p>
									<div className="plan__detail">
										<p>Every feature included</p>
										<p>Set booking fees, sent instantly to your treasury</p>
										<p>No hidden costs</p>
									</div>
									<div className="plan__divider" />
									<p className="plan__highlight">
										<b>0.59 SOL</b> for every 1K NFTs in your collection <b>per Month</b>
									</p>
									<Button className="btn-border-gradient">
										<span className="btn__label" onClick={handleClick}>
											Try for Free
										</span>
									</Button>
								</div>
								<div className="plan">
									<p className="plan__title">Annual Plan</p>
									<p className="plan__description">
										Your whole community for one fixed price
									</p>
									<div className="plan__detail">
										<p>Every feature offered, plus more</p>
										<p>Set booking fees, sent instantly to your treasury</p>
										<p>No hidden costs</p>
									</div>
									<div className="plan__divider" />
									<p className="plan__highlight">
										<b>Unlimited NFTs</b> in your collection <b>30 SOL</b> billed annually
									</p>
									<Button className="btn-border-gradient">
										<span className="btn__label" onClick={handleClick}>
											Try for Free
										</span>
									</Button>
								</div>
							</div>
						</div>
					) : (
						<div className="settings">
							<p className="settings__title">Community Settings</p>
							<div className="settings__divider" />
							<Form
								onSubmit={handleCreateCommunity}
								render={({ handleSubmit }) => (
									<form onSubmit={handleSubmit}>
										<Field name="name" label="Community Name">
											{(props) => <InputForm {...props} />}
										</Field>
										<ImageDropzone defaultImage="/images/looties.png" setFile={setFile} />
									</form>
								)}
							/>
						</div>
					)}
				</div>
			</div>
		</MainLayout>
	)
}

export default CreateCommunity
