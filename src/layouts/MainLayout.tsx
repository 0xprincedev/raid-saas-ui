import ReactHelmet from 'react-helmet'
import Sidebar from './Sidebar'
import Header from './Header'

interface MainLayoutProps {
	title?: string
	className?: string
	children?: React.ReactNode
}

const MainLayout = ({ title, className, children }: MainLayoutProps) => {
	return (
		<>
			<ReactHelmet>
				<title>{title}</title>
			</ReactHelmet>
			<div className="main-layout">
				<Sidebar />
				<div className="main-content">
					<Header />
					<main className={className}>{children}</main>
				</div>
			</div>
		</>
	)
}

export default MainLayout
