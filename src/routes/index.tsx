import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'

import axios from 'utils/axios'
import { useAppDispatch } from 'app/hooks'
import { setLoadingStatus } from 'slices/user'
import Home from 'pages/Home'
import Dashboard from 'pages/Dashboard'
import Communities from 'pages/Communities'
import Settings from 'pages/Settings'
import CreateCommunity from 'pages/Settings/CreateCommunity'
import BookRaid from 'pages/BookRaid'
import Profile from 'pages/Profile'

const AppRoutes = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const wallet = useWallet()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (pathname === '/') return
		if (!wallet.publicKey) return
		if (!localStorage.getItem('token')) return navigate('/')
		dispatch(setLoadingStatus(true))
		axios
			.post('/user/login', { walletAddress: wallet.publicKey.toString() })
			.then()
			.catch(() => navigate('/'))
			.finally(() => dispatch(setLoadingStatus(false)))
	}, [pathname]) //eslint-disable-line

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="communities">
				<Route index element={<Communities />} />
			</Route>
			<Route path="settings">
				<Route index element={<Settings />} />
				<Route path="create-community" element={<CreateCommunity />} />
			</Route>
			<Route path="/book-a-raid" element={<BookRaid />} />
			<Route path="/profile" element={<Profile />} />
		</Routes>
	)
}

export default AppRoutes
