import { useMemo, useRef, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { Metaplex } from '@metaplex-foundation/js'
import { HyperspaceClient } from 'hyperspace-client-js'

import { HYPERSPACE_API_KEY } from 'config'
import MainLayout from 'layouts/MainLayout'
import InputForm from 'components/Form/InputForm'

const hsClient = new HyperspaceClient(HYPERSPACE_API_KEY)

const CreateCommunity = () => {
	const [status, setStatus] = useState<number>(0)
	const [file, setFile] = useState<any>(null)
	const [mintAddress, setMintAddress] = useState<string>('')
	const [isFetchingNFTData, setIsFetchingNFTData] = useState<boolean>(false)
	const ref = useRef<any>(null)
	const { connection } = useConnection()
	const metaplex = useMemo(() => new Metaplex(connection), [connection])

	const handleClick = () => {
		setStatus(1)
	}

	const handleCreateCommunity = (val: any) => {
		const { name, twitter, discord } = val
		console.log(name, twitter, discord)
	}

	const handleVerifyMintAddress = async () => {
		setIsFetchingNFTData(true)
		try {
			const NFT = await metaplex.nfts().findByMint({
				mintAddress: new PublicKey(mintAddress),
			})
			const creatorAddress = NFT.creators[0].address.toString()
			const data = await hsClient.getProjects({
				condition: { projectIds: [creatorAddress] },
			})
			console.log(data)
		} catch (err) {
			console.log(err)
		}
		setIsFetchingNFTData(false)
	}

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
							<Form
								onSubmit={handleCreateCommunity}
								render={({ handleSubmit }) => (
									<form onSubmit={handleSubmit}>
										<div className="community-settings">
											<p className="settings__title">Community Settings</p>
											<div className="settings__divider" />
											<Field name="name" label="Community Name">
												{(props) => <InputForm required {...props} />}
											</Field>
											<Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
												{file ? (
													<img
														src={URL.createObjectURL(file)}
														alt=""
														style={{ borderRadius: 4, width: 60, height: 60 }}
													/>
												) : (
													<Box
														sx={{
															border: 1,
															borderStyle: 'dashed',
															borderRadius: 1,
															width: 60,
															height: 60,
														}}
													/>
												)}
												<Stack spacing={0.75} sx={{ alignItems: 'center' }}>
													<Button className="upload" onClick={() => ref.current.click()}>
														Upload
													</Button>
													<Typography sx={{ fontSize: 10 }}>
														50x50 px Recommended
													</Typography>
												</Stack>
												<input
													type="file"
													onChange={(e) => {
														e.target.files?.[0] && setFile(e.target.files?.[0])
													}}
													style={{ display: 'none' }}
													ref={ref}
												/>
											</Stack>
											<div className="input-group">
												<Field name="twitter" label="Twitter">
													{(props) => <InputForm required {...props} />}
												</Field>
												<Field name="discord" label="Discord">
													{(props) => <InputForm required {...props} />}
												</Field>
											</div>
										</div>
										<div className="collection-settings">
											<p className="settings__title">Collection Settings</p>
											<div className="settings__divider" />
											<div className="mint-address">
												<TextField
													label="Mint Address"
													placeholder="Address of any NFT from the collection"
													onChange={(e) => setMintAddress(e.target.value)}
												/>
												<LoadingButton
													loading={isFetchingNFTData}
													onClick={handleVerifyMintAddress}
												>
													Verify
												</LoadingButton>
											</div>
										</div>
										<Button type="submit" className="submit btn-gradient">
											Submit
										</Button>
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
