import { useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import type { WalletError } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
	PhantomWalletAdapter,
	SlopeWalletAdapter,
	SolflareWalletAdapter,
	SolletWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@solana/wallet-adapter-react-ui/styles.css'
import 'react-toastify/dist/ReactToastify.css'

import { mainnetRPC } from 'constant'
import AppRoutes from 'routes'
import 'styles/app.scss'

const network = WalletAdapterNetwork.Mainnet
const endpoint = mainnetRPC
const theme = createTheme({
	typography: {
		button: {
			textTransform: 'none',
			fontFamily: 'Poppins',
		},
		fontFamily: 'Poppins',
	},
	breakpoints: {
		values: {
			xs: 576,
			sm: 768,
			md: 1024,
			lg: 1280,
			xl: 1536,
		},
	},
	palette: {
		mode: 'light',
		primary: {
			main: '#4D4D4D',
		},
	},
})

const App = () => {
	const wallets = useMemo(
		() => [
			new PhantomWalletAdapter(),
			new SlopeWalletAdapter({ network }),
			new SolflareWalletAdapter({ network }),
			new SolletWalletAdapter({ network }),
		],
		[network] //eslint-disable-line
	)
	const walletConnectionError = (error: WalletError) => {
		console.log('Wallet Connection Error: ', error)
	}

	return (
		<>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider
					wallets={wallets}
					onError={walletConnectionError}
					autoConnect={true}
				>
					<WalletModalProvider>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<AppRoutes />
						</ThemeProvider>
					</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
			<ToastContainer
				autoClose={2000}
				theme="light"
				pauseOnFocusLoss={false}
				pauseOnHover={false}
			/>
		</>
	)
}

export default App
