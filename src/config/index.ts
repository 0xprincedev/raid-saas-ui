export const raid = {
	imgURL: '/images/nft.png',
	name: 'NFT #1240',
	reward: 33,
	unit: 'DUST',
}

export const tweet = {
	imgURL: '/images/nft.png',
	avatar: '/images/avatar.png',
	username: 'Pablo',
	description:
		'Just picked up a new DeGod! LFG! Bought it because it reminded me of an Azuki. LFG!',
}

export const HYPERSPACE_API_KEY = process.env.REACT_APP_HYPERSPACE_API_KEY || ''

export const budgets = [
	{ value: 1.5, name: '1.5 SOL' },
	{ value: 3, name: '3 SOL' },
	{ value: 5, name: '5 SOL' },
	{ value: 10, name: '10 SOL' },
	{ value: 15, name: '15 SOL' },
]

export const raidBreakdown = {
	1.5: {
		fcfs: { amount: 65, value: 0.02 },
		additional: {
			amount: 100,
			value: 0.002,
		},
	},
	3: {
		fcfs: { amount: 130, value: 0.02 },
		additional: {
			amount: 200,
			value: 0.002,
		},
	},
	5: {
		fcfs: { amount: 217, value: 0.02 },
		additional: {
			amount: 333,
			value: 0.002,
		},
	},
	10: {
		fcfs: { amount: 433, value: 0.02 },
		additional: {
			amount: 667,
			value: 0.002,
		},
	},
	15: {
		fcfs: { amount: 650, value: 0.02 },
		additional: {
			amount: 1000,
			value: 0.002,
		},
	},
}
