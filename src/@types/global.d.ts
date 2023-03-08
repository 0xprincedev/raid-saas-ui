declare module 'chai'
declare module 'react-helmet'
declare module 'react-gradient-progress'

type ColorMode = 'light' | 'dark'

type RaidBudget = 1.5 | 3 | 5 | 10 | 15

interface Raid {
	userId: string
	budget: RaidBudget
	community: string
	tweetId: string
	requiredWords: string[]
	ineligibleWords: string[]
}

interface Community {}
