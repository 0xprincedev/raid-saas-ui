import { Route, Routes } from 'react-router-dom'

import Home from 'pages/Home'
import Dashboard from 'pages/Dashboard'
import Communities from 'pages/Communities'
import BookRaid from 'pages/BookRaid'
import Profile from 'pages/Profile'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="communities">
				<Route index element={<Communities />} />
			</Route>
			<Route path="/book-a-raid" element={<BookRaid />} />
			<Route path="/profile" element={<Profile />} />
		</Routes>
	)
}

export default AppRoutes
