import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'

import axios from 'utils/axios'
import { useAppDispatch } from 'app/hooks'
import { getCommunities, setLoadingStatus } from 'slices/user'

const Initialize = () => {
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

	useEffect(() => {
		if (!wallet.publicKey) return
		dispatch(getCommunities(wallet.publicKey.toString()))
	}, [wallet.publicKey, dispatch])

	return <></>
}

export default Initialize
