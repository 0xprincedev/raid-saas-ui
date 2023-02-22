import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

import { login } from 'utils/user'
import CreateAccountModal from 'components/Modal/CreateAccountModal'
import ColorMode from 'components/ColorMode'

const Home = () => {
	const [open, setOpen] = useState<boolean>(false)
	const navigate = useNavigate()
	const wallet = useWallet()
	const { setVisible } = useWalletModal()
	const walletAddress = useMemo(() => wallet.publicKey?.toString() || '', [wallet])

	const handleStartRaiding = () => {
		setOpen(true)
	}

	const handleBookRaid = async () => {
		if (!wallet.publicKey) {
			setVisible(true)
			return
		}
		if (await login(walletAddress)) {
			navigate('/book-a-raid')
		}
	}

	const handleCreateCommunity = async () => {
		if (!wallet.publicKey) {
			setVisible(true)
			return
		}
		if (await login(walletAddress)) {
			navigate('/settings/create-community')
		}
	}

	const handleLogin = async () => {
		if (!wallet.publicKey) {
			setVisible(true)
			return
		}
		if (await login(walletAddress)) {
			navigate('/dashboard')
		}
	}

	return (
		<main className="home">
			<CreateAccountModal open={open} closeModal={() => setOpen(false)} />
			<nav>
				<Link to="/" className="logo">
					<img src="/images/logo.png" alt="" />
				</Link>
				<ColorMode />
				<p className="login" onClick={handleLogin}>
					Login
				</p>
				<Button className="btn-gradient create-community" onClick={handleCreateCommunity}>
					Create Community
				</Button>
			</nav>
			<div className="content">
				<div className="detail">
					<h1>
						<span className="text-gradient">Raid2earn</span>
						<br />
						for everyone
					</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
					<div className="button-group">
						<Button className="btn-gradient start-raiding" onClick={handleStartRaiding}>
							Start Raiding
						</Button>
						<Button className="btn-border-gradient book-a-raid" onClick={handleBookRaid}>
							<span className="btn__label">Book a Raid</span>
						</Button>
					</div>
				</div>
				<img src="/images/landing.png" alt="" className="landing-image" />
			</div>
			<img src="/images/how-it-works.png" alt="" className="how-it-works" />
			<img src="/images/ellipse.png" alt="" className="ellipse-image" />
		</main>
	)
}

export default Home
