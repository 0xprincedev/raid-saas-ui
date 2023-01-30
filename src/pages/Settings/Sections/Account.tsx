import Button from '@mui/material/Button'
import TwitterIcon from '@mui/icons-material/Twitter'

import { shortenAddress } from 'utils'
import { ReactComponent as DiscordIcon } from 'icons/discord.svg'

const Account = () => {
	return (
		<section className="account">
			<div className="connections">
				<h4>Connections</h4>
				<div>
					<div className="social twitter">
						<TwitterIcon />
						Twitter
					</div>
					<p className="id">@pablolefleur</p>
					<Button className="link">Unlink</Button>
				</div>
				<div>
					<div className="social discord">
						<DiscordIcon />
						Discrod
					</div>
					<p className="id">pablo.#6666</p>
					<Button>Link</Button>
				</div>
			</div>
			<div className="wallets">
				<h4>Wallets</h4>
				{Array(3)
					.fill(0)
					.map((item, index) => (
						<div key={index}>
							<p>{shortenAddress('4FBqjSUBsYrkV2nSaSQ2fiythmSXRrQhXX3bN1A34M6R')}</p>
							<Button>Unlink</Button>
						</div>
					))}
				<Button className="btn-border-gradient link-another-wallet">
					<span className="btn__label">Link another wallet</span>
				</Button>
			</div>
		</section>
	)
}

export default Account
