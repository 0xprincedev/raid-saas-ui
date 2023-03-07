import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Lottie from 'react-lottie-player'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

import axios from 'utils/axios'
import { checked1 } from 'config/lottie'
import { ReactComponent as DiscordIcon } from 'icons/discord.svg'

interface Props {
	open: boolean
	closeModal: () => void
}

const CreateAccountModal = (props: Props) => {
	const { open, closeModal } = props
	const [currentStep, setCurrentStep] = useState<number>(0)
	const navigate = useNavigate()
	const wallet = useWallet()
	const { setVisible } = useWalletModal()

	const onSignUp = async () => {
		if (!wallet.publicKey) return
		try {
			const { data } = await axios.post('/user/register', {
				walletAddress: wallet.publicKey.toString(),
			})
			toast.success(data.message)
			setCurrentStep(3)
		} catch (err: any) {
			toast.error(err.message)
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
		onSignUp()
	}

	const handleConnectWallet = () => {
		if (!wallet.publicKey) {
			setVisible(true)
			return
		}
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
