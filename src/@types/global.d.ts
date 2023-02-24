declare module 'chai'
declare module 'react-helmet'
declare module 'react-gradient-progress'

type ColorMode = 'light' | 'dark'

interface Raid {
	budget: number
	community: string
	tweetLink: string
	requiredWords: string[]
	ineligibleWords: string[]
}
