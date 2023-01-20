import { Navigate, Route, Routes } from 'react-router-dom'

import Dashboard from 'pages/Dashboard'
import Communities from 'pages/Communities'
import Community from 'pages/Communities/Community'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/dashboard" replace />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="communities">
				<Route index element={<Communities />} />
				<Route path=":community" element={<Community />} />
			</Route>
		</Routes>
	)
}

export default AppRoutes
