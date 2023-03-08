import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, Form, FormSpy } from 'react-final-form'
import { toast } from 'react-toastify'
import LoadingButton from '@mui/lab/LoadingButton'

import { budgets, raidBreakdown } from 'config'
import { useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import { createRaid } from 'utils/raid'
import { errorToast, removeSpaceAndSplit } from 'utils'
import MainLayout from 'layouts/MainLayout'
import InputForm from 'components/Form/InputForm'
import SelectForm from 'components/Form/SelectForm'
import TopCommunities from 'components/TopCommunities'

const BookRaid = () => {
	const [values, setValues] = useState<Record<string, any>>({})
	const [isFetching, setIsFetching] = useState<boolean>(false)
	const navigate = useNavigate()
	const _communities = useAppSelector((state: RootState) => state.user.communities)
	const communities = useMemo(() => {
		return _communities.map((item) => {
			return { value: item._id, name: item.name }
		})
	}, [_communities])

	const valideTweetLink = (tweetLink: string) => {
		// Regular expression to match the tweet ID in the URL
		const tweetIdRegExp = /\/(\d+)$/

		// Extract the tweet ID from the URL
		const match = tweetLink.match(tweetIdRegExp)
		if (match && match.length > 1) {
			console.log(match[1])
			return match[1]
		}
		return ""
	}

	const handleBookRaid = async (val: any) => {
		const {
			budget,
			community,
			tweetLink,
			requiredWords: _requiredWords = '',
			ineligibleWords: _ineligibleWords = '',
		} = val

		const tweetId: string = valideTweetLink(tweetLink)
		if (tweetId === "") {
			toast.warn("Please input the correct tweet link.")
			return
		}

		const requiredWords = removeSpaceAndSplit(_requiredWords)
		const ineligibleWords = removeSpaceAndSplit(_ineligibleWords)

		setIsFetching(true)

		try {
			const res = await createRaid({
				budget,
				community,
				tweetId,
				requiredWords,
				ineligibleWords,
			})
			toast.success(res.data.message)
			navigate('/dashboard')
		} catch (err) {
			errorToast(err)
		}

		setIsFetching(false)
	}

	const handleChange = ({ values: arg }: any) => {
		setValues(arg)
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
											<FormSpy onChange={handleChange} />
											<Field name="budget" label="Budget">
												{(props) => <SelectForm data={budgets} {...props} required />}
											</Field>
											<Field
												name="community"
												label="Community"
												helperText="Desired community to raid your tweet"
											>
												{(props) => <SelectForm data={communities} {...props} required />}
											</Field>
										</div>
										<Field name="tweetLink" label="Tweet Link">
											{(props) => <InputForm required {...props} />}
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
												<span>
													{raidBreakdown?.[values.budget as RaidBudget]?.fcfs?.amount ||
														0}{' '}
													Raids @ .02 SOL per Raid
												</span>
											</div>
											<div>
												<span>Additional Raids</span>
												<span>
													{raidBreakdown?.[values.budget as RaidBudget]?.additional
														?.amount || 0}{' '}
													Raids @ .002 SOL per Raid
												</span>
											</div>
											<div>
												<span>
													{
														_communities.filter(
															(item) => item._id === values.community
														)?.[0]?.name
													}{' '}
													Community Treasury
												</span>
												<span>{values?.budget || 0} SOL</span>
											</div>
											<div>
												<span>Total Raids</span>
												<span>
													{(raidBreakdown?.[values.budget as RaidBudget]?.fcfs?.amount ||
														0) +
														(raidBreakdown?.[values.budget as RaidBudget]?.additional
															?.amount || 0)}{' '}
													Raids
												</span>
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
