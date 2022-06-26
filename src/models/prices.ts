import * as mongoose from "mongoose"
const Schema = mongoose.Schema

const pricesSchema = new Schema({
    collectionAddr: String,
    price: Number,
    chain: String,
}, 
{ timestamps: true })

export default mongoose.model('prices', pricesSchema)