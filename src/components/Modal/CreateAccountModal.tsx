import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'utils/axios'
import Lottie from 'react-lottie-player'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useSelector } from "react-redux"

import { useAppDispatch } from "app/hooks"
import { login, register } from 'slices/user'

import { checked1 } from 'config/lottie'
import { ReactComponent as DiscordIcon } from 'icons/discord.svg'

import { RootState } from "app/store"
import { saveToLocalStorage } from "utils"

interface Props {
	open: boolean
	closeModal: () => void
}

const CreateAccountModal = (props: Props) => {
	const { open, closeModal } = props
	const [currentStep, setCurrentStep] = useState<number>(0)
	const navigate = useNavigate()
	const { solana }: any = window
	const { setVisible } = useWalletModal()
	const user = useSelector((state: RootState) => state.user.user)
	const dispatch = useAppDispatch()

	const onSignUp = async () => {
		if (!solana._publicKey) return
		try {
			saveToLocalStorage('walletAddress', solana._publicKey.toString())
			if(user.walletAddress.length) {
				return
			}
			await dispatch(register(solana._publicKey.toString()))
		} catch (err: any) {
			toast.error(err.response.data.message)
		}
	}

	const handleClose = () => {
		closeModal()
		setCurrentStep(0)
	}

	const handleConnectTwitter = () => {
		setCurrentStep(2)
	}

	const handleConnectDiscord = async() => {
		if(!user.discordName) {
			window.location.href = process.env.REACT_APP_DISCORD_OAUTH || '';
		}
		setCurrentStep(3)
	}

	const handleConnectWallet = async() => {
		if (!solana._publicKey) {
			setVisible(true)
			return
		}
		onSignUp()
		setCurrentStep(1)
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
							<Button className="btn-gradient" onClick={handleConnectWallet}>
								Connect Wallet
							</Button>
						) : currentStep === 1 ? (
							<Button className="connect-twitter" onClick={handleConnectTwitter}>
								<TwitterIcon />
								Connect Twitter
							</Button>
						) : currentStep === 2 ? (
							<Button className="connect-discord" onClick={handleConnectDiscord}>
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
