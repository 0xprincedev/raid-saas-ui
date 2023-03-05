import { useEffect, useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useSelector } from 'react-redux'

import Home from 'pages/Home'
import Dashboard from 'pages/Dashboard'
import Communities from 'pages/Communities'
import Settings from 'pages/Settings'
import CreateCommunity from 'pages/Settings/CreateCommunity'
import BookRaid from 'pages/BookRaid'
import Profile from 'pages/Profile'
import Initialize from 'components/Initialize'

import type { RootState } from 'app/store'
import { useAppDispatch } from 'app/hooks'
import { login } from 'slices/user'

interface Props {
	children: any
}

const RequireAuth = ({ children }: Props) => {
	const { solana }: any = window
	const user = useSelector((state: RootState) => state.user.user)

	const logined = useMemo(() => {
		return user?.walletAddress.length > 0
	}, [user])


	const { setVisible } = useWalletModal()
	const dispatch = useAppDispatch()

	const handleLogin = async () => {
		if (!solana._publicKey) {
			setVisible(true)
			return
		}
		await dispatch(login(solana._publicKey))
	}

	useEffect(() => {
		console.log(solana._publicKey)
		handleLogin()
	}, [solana])

	return logined === true ? children : <Navigate to="/" replace />
}

const AppRoutes = () => {

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/dashboard"
					element={
						<RequireAuth>
							<Dashboard />
						</RequireAuth>
					}
				/>
				<Route path="communities">
					<Route
						index
						element={
							<RequireAuth>
								<Communities />
							</RequireAuth>
						}
					/>
				</Route>
				<Route path="settings">
					<Route
						index
						element={
							<RequireAuth>
								<Settings />
							</RequireAuth>
						}
					/>
					<Route
						path="create-community"
						element={
							<RequireAuth>
								<CreateCommunity />
							</RequireAuth>
						}
					/>
				</Route>
				<Route
					path="/book-a-raid"
					element={
						<RequireAuth>
							<BookRaid />
						</RequireAuth>
					}
				/>
				<Route
					path="/profile"
					element={
						<RequireAuth>
							<Profile />
						</RequireAuth>
					}
				/>
			</Routes>
			<Initialize />
		</>
	)
}

export default AppRoutes
