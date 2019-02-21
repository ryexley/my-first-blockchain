import { BlockChain } from "./blockchain";
import { Block } from "./block";
import uuid from "uuid/v1";

const getRandomNumber = (min, max) => (Math.floor(Math.random() * max) + min);

const blockchain = new BlockChain({ complexity: 3 });
console.log(`blockchain created:\ngenesis block:\n${JSON.stringify(blockchain.chain[0])}\n\n`);

const blocksToCreate = Array(getRandomNumber(10, 100)).fill().map((_, index) => index);

blocksToCreate.forEach(blockIndex => {
  const newBlock = new Block({
    index: blockIndex,
    data: {
      from: uuid(),
      to: uuid(),
      amount: getRandomNumber(100, 1000000)
    }
  });
  console.log(`adding block ${newBlock.hash} to blockchain\n`);
  blockchain.addBlock(newBlock);
});

console.log(`${blocksToCreate.length} blocks added to blockchain\n\n`);

const isValid = blockchain.confirmValidity();
console.log(isValid ? "blockchain is valid\n\n" : "blockchain is not valid\n\n");
