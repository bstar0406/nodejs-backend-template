import * as mongoose from "mongoose"

const Schema = mongoose.Schema

const collectionsSchema = new Schema({
    address: String,
    owner: String,
    name: String,
    description: String,
    symbol: String,
    type: String,
    websiteLink: String,
    facebookLink: String,
    twitterLink: String,
    instagramLink: String,
    telegramLink: String,
    mediumLink: String,
    discordLink: String,
    isVerified: Boolean,
    isExplicit: Boolean,
    standard: {
        type: String,
        default: 'erc'
    },
    chain: String
})

export default mongoose.model('collections', collectionsSchema)