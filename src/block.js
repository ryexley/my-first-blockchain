  // https://blog.liveedu.tv/how-to-create-your-own-cryptocurrency-blockchain-in-node-js/

import sha256 from "crypto-js/sha256";

export class Block {
  constructor({
    index,
    timestamp = new Date(),
    data = {},
    previousHash
  }) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.nonce = 0;
    this.previousHash = previousHash;
    this.hash = this.computeHash();
  }

  computeHash() {
    return sha256(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data) +
      this.nonce
    ).toString();
  }

  mine(complexity) {
    while (this.hash.substring(0, complexity) !== Array(complexity + 1).join("0")) {
      this.nonce += 1;
      this.hash = this.computeHash();
    }

    console.log(`Mining: ${this.hash}`);
  }
}
