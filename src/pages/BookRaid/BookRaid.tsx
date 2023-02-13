import { useState } from 'react'
import { Field, Form } from 'react-final-form'
import LoadingButton from '@mui/lab/LoadingButton'

import MainLayout from 'layouts/MainLayout'
import InputForm from 'components/Form/InputForm'
import SelectForm from 'components/Form/SelectForm'
import TopCommunities from 'components/TopCommunities'

const budgets = [
	{ value: 0.5, name: '0.5 SOL' },
	{ value: 0.5, name: '0.5 SOL' },
	{ value: 0.5, name: '0.5 SOL' },
	{ value: 0.5, name: '0.5 SOL' },
]

const communities = [
	{ value: -1, name: 'All' },
	{ value: 0, name: 'Okay Bears' },
	{ value: 1, name: 'y00ts' },
	{ value: 2, name: 'Jelly Rascals' },
	{ value: 3, name: 'De gods' },
]

const BookRaid = () => {
	const [isFetching, setIsFetching] = useState<boolean>(false)

	const handleBookRaid = (val: any) => {
		setIsFetching(true)
	}

	return (
		<MainLayout title="Raid Saas - Book a raid" className="book-a-raid" sidebarType={1}>
			<div className="container">
				<div className="content-wrapper new-raid-campaign">
					<div className="content">
						<h1 className="title text-gradient">New raid campaign</h1>
						<h5>Get the highest quality engagement from top communities.</h5>
						<div className="divider" />
						<Form
							onSubmit={handleBookRaid}
							render={({ handleSubmit }) => (
								<form onSubmit={handleSubmit} autoComplete="off" className="form">
									<div className="form__body">
										<div className="select-group">
											<Field name="budget" label="Budget">
												{(props) => <SelectForm data={budgets} {...props} />}
											</Field>
											<Field
												name="community"
												label="Community"
												helperText="Desired community to raid your tweet"
											>
												{(props) => <SelectForm data={communities} {...props} />}
											</Field>
										</div>
										<Field name="tweetLink" label="Tweet Link">
											{(props) => <InputForm {...props} />}
										</Field>
										<Field name="requiredWords" label="Required Words">
											{(props) => (
												<InputForm
													placeholder="Any words, @Usernames or Hashtags"
													helperText="Separate words with a comma"
													{...props}
												/>
											)}
										</Field>
										<Field name="ineligibleWords" label="Ineligible Words">
											{(props) => (
												<InputForm
													placeholder="Any words, @Usernames or Hashtags"
													helperText="Separate words with a comma"
													{...props}
												/>
											)}
										</Field>
										<div className="form__footer">
											<h6 className="title">Raid Breakdown</h6>
											<div>
												<span>FCFS Raids</span>
												<span>65 Raids @ .2 SOL per Raid</span>
											</div>
											<div>
												<span>Additional Raids</span>
												<span>100 Raids @ .125 SOL per Raid</span>
											</div>
											<div>
												<span>Okay Bears Community Treasury</span>
												<span>0.75 SOL</span>
											</div>
											<div>
												<span>Total Raids</span>
												<span>165 Raids</span>
											</div>
										</div>
									</div>
									<div className="preview">
										<div className="tweet-preview"></div>
										<LoadingButton
											loading={isFetching}
											className="btn-gradient"
											type="submit"
										>
											<span>Book Raid</span>
										</LoadingButton>
									</div>
								</form>
							)}
						/>
					</div>
				</div>
				<TopCommunities />
			</div>
		</MainLayout>
	)
}

export default BookRaid
