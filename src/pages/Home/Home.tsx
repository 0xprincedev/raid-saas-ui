import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

import CreateAccountModal from 'components/Modal/CreateAccountModal'

const Home = () => {
	return (
		<main className="home">
			<CreateAccountModal open={false} closeModal={() => console.log('123')} />
			<nav>
				<Link to="/dashboard">Dashboard</Link>
				<button className="btn-gradient create-community">Create Community</button>
			</nav>
			<div className="content">
				<div className="detail">
					<h1>Lorem ipsum dolor sit amet</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
					<div className="button-group">
						<Button className="btn-gradient start-raiding">Start Raiding</Button>
						<button className="btn-border-gradient book-a-raid">
							<span className="btn__label">Book a Raid</span>
						</button>
					</div>
				</div>
				<img src="/images/landing.png" alt="" className="landing-image" />
			</div>
			<img src="/images/ellipse.png" alt="" className="ellipse-image" />
		</main>
	)
}

export default Home
