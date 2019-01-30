const _ = require('lodash');

const TIMEOUT_REQUEST_WINDOW_TIME = require('../constants').TIMEOUT_REQUEST_WINDOW_TIME;
let _instance = null;

class Mempool {
    constructor() {
        this.mempool = [];
        this.timeoutRequests = {};
    }

    /**
     *
     * @param {string} address
     * @returns {{requestTimeStamp: number, walletAddress: string}}
     */
    getOrCreateItem(address) {
        const index = _.findIndex(this.mempool, (o) =>  o.walletAddress === address);
        if (index !== -1) {
            return this.mempool[index];
        }

        const item = {
            walletAddress: address,
            requestTimeStamp: Number(new Date().getTime().toString().slice(0,-3)),
        };

        this.mempool.push(item);
        this.timeoutRequests[address]= setTimeout(() => this.removeItem(address), TIMEOUT_REQUEST_WINDOW_TIME);

        return item;
    }


    removeItem(address) {
        clearTimeout(this.timeoutRequests[address]);
        delete this.timeoutRequests[address];

        const mempoolIndex = _.findIndex(this.mempool, (o) =>  o.walletAddress === address);
        if (mempoolIndex !== -1) {
            this.mempool.splice(mempoolIndex, 1)
        }
    }

}

module.exports = _instance ? _instance : new Mempool();
