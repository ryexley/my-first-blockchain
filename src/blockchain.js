// https://blog.liveedu.tv/how-to-create-your-own-cryptocurrency-blockchain-in-node-js/

import { Block } from "./block";

const createGenesisBlock = () => new Block({
  index: 0,
  timestamp: new Date(-8640000000000000),
  data: "genesis block",
  previousHash: "0"
});

export class BlockChain {
  constructor({ complexity = 5 }) {
    this.chain = [createGenesisBlock()];
    this.complexity = complexity;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mine(this.complexity);
    this.chain.push(newBlock);
  }

  confirmValidity() {
    console.log("confirming blockchain validity\n");

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      console.log(`confirming validity of block: ${JSON.stringify(currentBlock, null, 2)}\n`);

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}
