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

import { useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import { mainnetRPC } from 'constant'
import useWindowSize from 'hooks/useWindowSize'
import AppRoutes from 'routes'
import Loading from 'components/Loading'
import 'styles/app.scss'

const network = WalletAdapterNetwork.Mainnet
const endpoint = mainnetRPC

const App = () => {
	const colorMode = useAppSelector((state: RootState) => state.user.colorMode)

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

	const windowSize = useWindowSize()

	const theme = useMemo(
		() =>
			createTheme({
				typography: {
					button: {
						textTransform: 'none',
						fontFamily: 'Poppins',
					},
					fontFamily: 'Poppins',
					fontSize: windowSize.width > 768 ? 14 : 12,
				},
				breakpoints: {
					values: {
						xs: 0,
						sm: 768,
						md: 1024,
						lg: 1280,
						xl: 1536,
					},
				},
				palette: {
					mode: colorMode,
					primary: {
						main: colorMode === 'light' ? '#4D4D4D' : '#A1A1A1',
					},
				},
			}),
		[colorMode, windowSize]
	)

	return (
		<>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={wallets} onError={walletConnectionError} autoConnect>
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
				theme={colorMode}
				pauseOnFocusLoss={false}
				pauseOnHover={false}
			/>
			<Loading />
		</>
	)
}

export default App
