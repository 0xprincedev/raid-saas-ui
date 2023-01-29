import ReactHelmet from 'react-helmet'
import Sidebar from './Sidebar'
import Header from './Header'

interface MainLayoutProps {
	title?: string
	className?: string
	children?: React.ReactNode
	sidebarType?: number
}

const MainLayout = ({ title, className, children, sidebarType = 0 }: MainLayoutProps) => {
	return (
		<>
			<ReactHelmet>
				<title>{title}</title>
			</ReactHelmet>
			<div className="main-layout">
				<Sidebar type={sidebarType} />
				<div className="main-content">
					<Header />
					<main className={className}>{children}</main>
				</div>
			</div>
		</>
	)
}

export default MainLayout
