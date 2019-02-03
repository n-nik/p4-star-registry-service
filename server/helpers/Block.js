/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

/**
 * @typedef {Object} BlockInstance
 * @property {string} hash - Block hash
 * @property {number} height - Block height
 * @property {string} body - Block body
 * @property {number} time - unix timestamp
 * @property {string} previousBlockHash
 *
 */
class Block {
	constructor(data){
		this.hash = "";
		this.height = 0;
		this.body = data;
		this.time = 0;
		this.previousBlockHash = "";
	}
}

module.exports.Block = Block;
