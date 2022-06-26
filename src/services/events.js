"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installRopstenEvents = exports.installBSCTestEvents = void 0;
const Test = require("../abis/Test.json");
const ethers_1 = require("ethers");
const installBSCTestEvents = () => {
    var wsProvider = new ethers_1.ethers.providers.WebSocketProvider(process.env.BSCTEST_RPC);
    let contract = new ethers_1.ethers.Contract(Test.bsctest, Test.abi, wsProvider);
    contract.on("updated", (from, to, value, event) => {
        console.log(from);
    });
};
exports.installBSCTestEvents = installBSCTestEvents;
const installRopstenEvents = () => {
    var wsProvider = new ethers_1.ethers.providers.WebSocketProvider(process.env.ROPSTEN_RPC);
    let contract = new ethers_1.ethers.Contract(Test.ropsten, Test.abi, wsProvider);
    contract.on("updated", (from, to, value, event) => {
        console.log(from);
    });
};
exports.installRopstenEvents = installRopstenEvents;
//# sourceMappingURL=events.js.map