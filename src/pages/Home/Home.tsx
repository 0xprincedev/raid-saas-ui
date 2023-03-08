import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

import ColorMode from 'components/ColorMode'

import { useAppDispatch } from 'app/hooks'
import { setIsCreateAccountModalOpen } from 'slices/user'

const Home = () => {
	const dispatch = useAppDispatch()

	const handleStartRaiding = () => {
		dispatch(setIsCreateAccountModalOpen(true))
	}

	return (
		<main className="home">
			<nav>
				<Link to="/" className="logo">
					<img src="/images/logo.png" alt="" />
				</Link>
				<ColorMode />
				<Link to="/Dashboard">
					<p className="login">Login</p>
				</Link>
				<Link to="/settings/create-community">
					<Button className="btn-gradient create-community">Create Community</Button>
				</Link>
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
						<Link to="/book-a-raid">
							<Button className="btn-border-gradient book-a-raid">
								<span className="btn__label">Book a Raid</span>
							</Button>
						</Link>
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
