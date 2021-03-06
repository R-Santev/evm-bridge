import { ethers } from "hardhat";
import { Bridge__factory, Bridge } from "./../types/index";

async function main() {
  if (!process.env.CONTRACT_ADDRESS) {
    throw new Error(`You must specify a "CONTRACT_ADDRESS" env variable`);
  }

  if (!process.env.TARGET_CHAIN) {
    throw new Error(`You must specify a "TARGET_CHAIN" env variable`);
  }

  if (!process.env.NATIVE_TOKEN) {
    throw new Error(`You must specify a "NATIVE_TOKEN" env variable`);
  }

  if (!process.env.AMOUNT) {
    throw new Error(`You must specify a "AMOUNT" env variable`);
  }

  const wallet = (await ethers.getSigners())[0];
  const contract = Bridge__factory.connect(process.env.CONTRACT_ADDRESS, wallet);

  await lock(contract, Number(process.env.TARGET_CHAIN), process.env.NATIVE_TOKEN, process.env.AMOUNT);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

async function lock(contract: Bridge, targetChain: number, nativeToken: string, amount: string): Promise<void> {
  const tx = await contract.functions.lock(targetChain, nativeToken, ethers.utils.parseEther(amount));
  console.log(tx.hash);
  console.log("-----------------------------");
}
