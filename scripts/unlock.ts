import { ethers } from "hardhat";
import { Bridge__factory, Bridge } from "../types/index";

async function main() {
  if (!process.env.CONTRACT_ADDRESS) {
    throw new Error(`You must specify a "CONTRACT_ADDRESS" env variable`);
  }

  if (!process.env.NATIVE_TOKEN) {
    throw new Error(`You must specify a "NATIVE_TOKEN" env variable`);
  }

  if (!process.env.AMOUNT) {
    throw new Error(`You must specify a "AMOUNT" env variable`);
  }

  if (!process.env.RECEIVER) {
    throw new Error(`You must specify a "RECEIVER" env variable`);
  }

  const wallet = (await ethers.getSigners())[0];
  const contract = Bridge__factory.connect(process.env.CONTRACT_ADDRESS, wallet);

  await unlock(contract, process.env.NATIVE_TOKEN, process.env.AMOUNT, process.env.RECEIVER);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

async function unlock(contract: Bridge, nativeToken: string, amount: string, receiver: string): Promise<void> {
  const tx = await contract.functions.unlock(nativeToken, amount, receiver);

  console.log(tx.hash);
  console.log("-----------------------------");
}
