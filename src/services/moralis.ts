/* import moralis */
const Moralis = require("moralis/node")
const serverUrl = process.env.MORALIS_SERVER
const appId = process.env.MORALIS_APP_ID
const moralisSecret = process.env.MORALIS_SECRET

export const hasUserNFT = async (chain: string, signer: string, collection: string, tokenId) => {
    try {
        await Moralis.start({ serverUrl, appId, moralisSecret })

        if ( tokenId == null ) {
            const options = { address: collection, chain }
            const nftOwners = await Moralis.Web3API.token.getNFTOwners(options)
            for ( let nftOwner of nftOwners.result ) {
                if ( nftOwner.owner_of == signer ) {
                    return true
                }
            }
        } else if ( tokenId >= 0 ) {
            const options = { address: collection, token_id: tokenId, chain }
            const nftOwners = await Moralis.Web3API.token.getTokenIdOwners(options)
            for ( let nftOwner of nftOwners.result ) {
                if ( nftOwner.owner_of == signer ) {
                    return true
                }
            }
        }
        return false
    } catch (err) {
        console.log(err)
        return false
    }
}

export const getUserNFTs = async (chain: string, address: string) => {
    try {
        await Moralis.start({ serverUrl, appId, moralisSecret })
    
        let cursor = null, nfts = []
        do {
            const options = {
                chain,
                address,
                cursor
            }
            const nft_result = await Moralis.Web3API.account.getNFTs(options)
            cursor = nft_result.cursor
            nfts = nfts.concat(nft_result.result)
        } while ( cursor !== "" )
        
        return nfts
    } catch (err) {
        console.log(err)
        return []
    }     
}