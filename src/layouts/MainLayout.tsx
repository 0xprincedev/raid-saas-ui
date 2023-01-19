import ReactHelmet from 'react-helmet'
import Sidebar from './Sidebar'

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
				<main className={className}>{children}</main>
			</div>
		</>
	)
}

export default MainLayout
