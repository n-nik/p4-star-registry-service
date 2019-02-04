const _ = require('lodash');

class Mempool {
    constructor(timeout) {
        this.mempool = [];
        this.timeoutRequests = {};
        this.timeout = timeout;
    }

    /**
     * @param {string} address
     * @returns {{requestTimeStamp: number, address: string}}
     */
    getOrCreateItem(address) {
        const index = _.findIndex(this.mempool, (o) =>  o.address === address);
        if (index !== -1) {
            return this.mempool[index];
        }

        const item = {
            address,
            requestTimeStamp: Number(new Date().getTime().toString().slice(0,-3)),
        };

        this.createItem(item);
        return item;
    }

    /**
     * @param {{requestTimeStamp: number, address: string}} item
     */
    createItem(item) {
        this.mempool.push(item);

        if (this.timeout) {
            this.timeoutRequests[item.address]= setTimeout(() => this.removeItem(item.address), this.timeout);
        }
    }

    /**
     * @param {string} address
     * @returns {{requestTimeStamp: number, address: string} | null}
     */
    getItem(address) {
        const index = _.findIndex(this.mempool, (o) =>  o.address === address);
        return index !== -1 ? this.mempool[index] : null;
    }

    /**
     * @param {string} address
     */
    removeItem(address) {
        clearTimeout(this.timeoutRequests[address]);
        delete this.timeoutRequests[address];

        const mempoolIndex = _.findIndex(this.mempool, (o) =>  o.address === address);
        if (mempoolIndex !== -1) {
            this.mempool.splice(mempoolIndex, 1)
        }
    }

}

module.exports = Mempool;
