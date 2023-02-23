import { PublicKey } from '@solana/web3.js'

export const getNFTCollectionData = async (
	mintAddress: string,
	metaplex: any,
	hsClient: any
) => {
	try {
		const NFT = await metaplex.nfts().findByMint({
			mintAddress: new PublicKey(mintAddress),
		})
		const creatorAddress = NFT.creators[0].address.toString()
		const { getProjectStats } = await hsClient.getProjects({
			condition: { projectIds: [creatorAddress] },
		})
		return {
			creatorAddress,
			collectionName: getProjectStats?.project_stats?.[0].project?.display_name || '',
			mintCount: getProjectStats?.project_stats?.[0].project?.supply || 0,
		}
	} catch (err: any) {
		throw new Error(err)
	}
}
