import { useEffect, useState } from 'react'
import Lottie from 'react-lottie-player'
import { Modal } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

import { checked1 } from 'config/lottie'
import { ReactComponent as DiscordIcon } from 'icons/discord.svg'

interface Props {
	open: boolean
	closeModal: () => void
}

const CreateAccountModal = (props: Props) => {
	const { open, closeModal } = props
	const [currentStep, setCurrentStep] = useState<number>(3)
	const wallet = useWallet()
	const { setVisible } = useWalletModal()

	useEffect(() => {
		if (wallet.publicKey) {
			console.log(wallet.publicKey.toString())
		}
	}, [wallet])

	const handleClose = () => {
		if (!window.confirm('Are you sure you want to cancel creating account?')) {
			return
		}
		closeModal()
	}

	const handleConnectTwitter = () => {
		setCurrentStep(1)
	}

	const handleConnectDiscord = () => {
		setCurrentStep(2)
	}

	const handleConnectWallet = () => {
		setVisible(true)
	}

	const getTitleText = (_currentStep: number) => {
		if (_currentStep === 0) {
			return 'Connect your Twitter'
		} else if (_currentStep === 1) {
			return 'Connect your Discord'
		} else if (_currentStep === 2) {
			return 'Link your wallet'
		}
	}

	const getDescription = (_currentStep: number) => {
		if (_currentStep <= 1) {
			return 'Account you plan to raid with'
		} else if (_currentStep === 2) {
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
											className={`step ${currentStep === index ? 'step__active' : ''}`}
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
							<button className="connect-twitter" onClick={handleConnectTwitter}>
								<TwitterIcon />
								Connect Twitter
							</button>
						) : currentStep === 1 ? (
							<button className="connect-discord" onClick={handleConnectDiscord}>
								<DiscordIcon />
								Connect Discord
							</button>
						) : currentStep === 2 ? (
							<button className="connect-wallet" onClick={handleConnectWallet}>
								Connect Wallet
							</button>
						) : (
							<button className="btn-gradient">Start Raiding</button>
						)}
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default CreateAccountModal
