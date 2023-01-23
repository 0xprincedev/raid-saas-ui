import BookRaidButton from 'components/Button/BookRaid'
import { Link } from 'react-router-dom'

const Home = () => {
	return (
		<main className="home">
			<nav>
				<Link to="/dashboard">Dashboard</Link>
			</nav>
			<div className="content">
				<div className="detail">
					<h1>Lorem ipsum dolor sit amet</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
					<div className="button-group">
						<button className="start-raiding">Start Raiding</button>
						<BookRaidButton />
					</div>
				</div>
				<img src="/images/landing.png" alt="" className="landing-image" />
			</div>
			<img src="/images/ellipse.png" alt="" className="ellipse-image" />
		</main>
	)
}

export default Home
