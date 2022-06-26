
import * as Test from "../abis/Test.json"
import { ethers } from 'ethers'

export const installBSCTestEvents = () => {
    var wsProvider = new ethers.providers.WebSocketProvider(process.env.BSCTEST_RPC as string)
    let contract = new ethers.Contract(Test.bsctest, Test.abi, wsProvider)

    contract.on("updated", (from, to, value, event) => {
        console.log(from)
    })
}

export const installRopstenEvents = () => {
    var wsProvider = new ethers.providers.WebSocketProvider(process.env.ROPSTEN_RPC as string)
    let contract = new ethers.Contract(Test.ropsten, Test.abi, wsProvider)

    contract.on("updated", (from, to, value, event) => {
        console.log(from)
    })
}