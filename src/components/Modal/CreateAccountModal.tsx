import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Lottie from 'react-lottie-player'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useSelector } from 'react-redux'
import TwitterLogin from 'react-twitter-auth'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { loginDiscord, register, setIsCreateAccountModalOpen } from 'slices/user'
import { setCurrentStep, getCommunities } from 'slices/user'
import { apiLogin } from "utils/user"

import { checked1 } from 'config/lottie'
import { ReactComponent as DiscordIcon } from 'icons/discord.svg'

import { RootState } from 'app/store'
import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { useWallet } from '@solana/wallet-adapter-react'

const CreateAccountModal = () => {
	// @ts-ignore
	const open = useAppSelector((state: RootState) => state.user.isCreateAccountModalOpen)
	// @ts-ignore
	const currentStep = useAppSelector((state: RootState) => state.user.currentStep)
	const navigate = useNavigate()
	const wallet = useWallet()
	const { setVisible } = useWalletModal()
	// @ts-ignore
	const user = useSelector((state: RootState) => state.user.user)
	const dispatch = useAppDispatch()

	const closeModal = () => {
		dispatch(setIsCreateAccountModalOpen(false))
	}

	const handleClose = () => {
		closeModal()
		dispatch(setCurrentStep(0))
	}

	useEffect(() => {
		const getCode = async () => {
			if (window.location.href.indexOf('code') !== -1) {
				const code = window.location.href.substring(
					window.location.href.indexOf('code') + 5,
					window.location.href.length
				)

				const resDiscord = await dispatch(loginDiscord( code ))
				if (!resDiscord?.payload?.success) {
					return
				}
				saveToLocalStorage('discordName', resDiscord?.payload?.discordName)
				toast.success(resDiscord.payload.message)

				const walletAddress = getFromLocalStorage('walletAddress')
				const { displayName: twitterDisplayName, username: twitterUserName } = getFromLocalStorage('twitterInfo')
				const discordName = getFromLocalStorage('discordName')

				const resRegister = await dispatch(register({walletAddress, twitterDisplayName, twitterUserName, discordName}))
				await dispatch(getCommunities(walletAddress))
				console.log(resRegister)
				if (!resRegister?.payload?.success) {
					return
				}
				toast.success(resRegister?.payload.message)
				dispatch(setIsCreateAccountModalOpen(true))
				dispatch(setCurrentStep(3))
			}
		}
		getCode()	
	}, [])

	const handleConnectDiscord = async () => {
		if (!user.discordName) {
			window.location.href = process.env.REACT_APP_DISCORD_OAUTH || ''
		}
	}

	const handleConnectWallet = async () => {
		if (!wallet.publicKey) {
			setVisible(true)
			return
		}
		try {
			// check if wallet address is already registered
			const res = await apiLogin(wallet.publicKey.toString())
			if (res.success) {
				toast.warning('This wallet is already registered, login instead')
				closeModal()
			} else {
				dispatch(setCurrentStep(1))
			}
		} catch (err: any) {
			toast.error('Something went wrong, please try again')
		}
	}

	const handleStartRaiding = () => {
		navigate('/dashboard')
	}

	const getTitleText = (_currentStep: number) => {
		if (_currentStep === 1) {
			return 'Connect your Twitter'
		} else if (_currentStep === 2) {
			return 'Connect your Discord'
		} else if (_currentStep === 0) {
			return 'Link your wallet'
		}
	}

	const getDescription = (_currentStep: number) => {
		if (_currentStep === 1 || _currentStep === 2) {
			return 'Account you plan to raid with'
		} else if (_currentStep === 0) {
			return 'Verifying ownership of wallet'
		}
	}

	const onTwitterSuccess = async(response: any) => {
		const { user, success } = await response.json()
		if (success) {
			saveToLocalStorage("twitterInfo", {displayName: user.displayName, username: user.username})
		}
		dispatch(setCurrentStep(2))
	}

	const onTwitterFailed = (err: any) => {
		console.log(err)
	}

	return (
		<Modal open={open} onClose={handleClose}>
			<div className="modal modal__create-account">
				<div className="modal__content">
					<div className="modal__header">
						<h1 className="text-gradient">
							{currentStep <= 2 ? 'Create Account' : 'Account Created'}
						</h1>
						{currentStep === 3 && <p>Your account has been successfully created 🎉</p>}
						{currentStep <= 2 && (
							<div className="stepper">
								{Array(3)
									.fill(0)
									.map((item, index) => (
										<div
											className={`step ${currentStep >= index ? 'step__active' : ''}`}
											key={index}
										/>
									))}
							</div>
						)}
					</div>
					<div className="modal__body">
						<h2>{getTitleText(currentStep)}</h2>
						<p>{getDescription(currentStep)}</p>
						{currentStep === 3 && (
							<Lottie
								animationData={checked1}
								loop
								play
								speed={0.8}
								className="lottie-player"
								style={{ width: 150, height: 150 }}
							/>
						)}
						{currentStep === 0 ? (
							<Button className="btn-gradient button" onClick={handleConnectWallet}>
								Connect Wallet
							</Button>
						) : currentStep === 1 ? (
							<>
							{console.log(process.env.REACT_APP_LOGIN_URL)}
								<TwitterLogin
									loginUrl={`${process.env.REACT_APP_LOGIN_URL}`}
									onFailure={onTwitterFailed}
									onSuccess={onTwitterSuccess}
									requestTokenUrl={`${process.env.REACT_APP_REQUEST_TOKEN_URL}`}
									style={{ backgroundColor: 'transparent' }}
									children={
										<Button className="connect-twitter button">
											<TwitterIcon />
											Connect Twitter
										</Button>
									}
								/>
							</>
						) : currentStep === 2 ? (
							<Button className="connect-discord button" onClick={handleConnectDiscord}>
								<DiscordIcon />
								Connect Discord
							</Button>
						) : (
							<Button className="btn-gradient" onClick={handleStartRaiding}>
								Start Raiding
							</Button>
						)}
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default CreateAccountModal
