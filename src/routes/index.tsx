import { Route, Routes } from 'react-router-dom'

import Home from 'pages/Home'
import Dashboard from 'pages/Dashboard'
import Communities from 'pages/Communities'
import Settings from 'pages/Settings'
import CreateCommunity from 'pages/Settings/CreateCommunity'
import BookRaid from 'pages/BookRaid'
import Profile from 'pages/Profile'
import Initialize from 'components/Initialize'

const AppRoutes = () => {
	return (
		<>
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
			<Initialize />
		</>
	)
}

export default AppRoutes
