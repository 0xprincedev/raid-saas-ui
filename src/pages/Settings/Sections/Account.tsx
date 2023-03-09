import Button from '@mui/material/Button'
import TwitterIcon from '@mui/icons-material/Twitter'

import { shortenAddress } from 'utils'
import { ReactComponent as DiscordIcon } from 'icons/discord.svg'
import { useAppSelector } from "app/hooks"
import { RootState } from "app/store"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

const Account = () => {
	const user = useAppSelector((state: RootState) => state.user.user)
	const  { setVisible } = useWalletModal()

	const connectAnotherWallet = () => {
		setVisible(true)
	}

	return (
		<section className="account">
			<div className="connections">
				<h4>Connections</h4>
				<div>
					<div className="social twitter">
						<TwitterIcon />
						Twitter
					</div>
					<p className="id">{user.twitterUserName || ""}</p>
					<Button className="link">{user.twitterUserName ? "Unlink" : "Link" }</Button>
				</div>
				<div>
					<div className="social discord">
						<DiscordIcon />
						Discrod
					</div>
					<p className="id">{user.discordName || ""}</p>
					<Button>{user.discordName ? "Unlink" : "Link" }</Button>
				</div>
			</div>
			<div className="wallets">
				<h4>Wallets</h4>
				{user.walletAddress.map((item: string, index: number) => (
						<div key={index}>
							<p>{shortenAddress(item)}</p>
							<Button>Unlink</Button>
						</div>
					))}
				<Button className="btn-border-gradient link-another-wallet" onClick={connectAnotherWallet}>
					<span className="btn__label">Link another wallet</span>
				</Button>
			</div>
		</section>
	)
}

export default Account
