import { Route, Routes } from 'react-router-dom'

import Home from 'pages/Home'
import Community from 'pages/Communities/Community'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="communities">
				<Route path=":community" element={<Community />} />
			</Route>
		</Routes>
	)
}

export default AppRoutes
