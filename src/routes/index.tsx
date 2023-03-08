import { useEffect, useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet } from "@solana/wallet-adapter-react"
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
import Leaderborad from 'pages/Leaderboard/Leaderborad'
import { toast } from "react-toastify"
import { getFromLocalStorage } from "utils"

interface Props {
	children: any
}

const RequireAuth = ({ children }: Props) => {
	const wallet = useWallet()
	// const user = useSelector((state: RootState) => state.user.user)
	const user = getFromLocalStorage('user')

	const logined = useMemo(() => {
		return user?.walletAddress.length > 0
	}, [user])

	const { setVisible } = useWalletModal()
	const dispatch = useAppDispatch()

	const handleLogin = async () => {
		if (!wallet.publicKey) {
			setVisible(true)
			return
		}

		console.log(wallet.publicKey.toString())
		const res = await dispatch(login(wallet.publicKey.toString()))
		if (res.payload.success) {
			toast.success(res.payload.message)
		} else {
			toast.error(res.payload.message)
		}
	}

	useEffect(() => {
		handleLogin()
	}, [wallet.publicKey]) // eslint-disable-line

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
					<Route index element={<Communities />} />
					<Route
						path=":communityId"
						element={
							<RequireAuth>
								<Communities />
							</RequireAuth>
						}
					/>
				</Route>
				<Route path="leaderboard">
					<Route
						index
						element={
							<RequireAuth>
								<Leaderborad />
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
