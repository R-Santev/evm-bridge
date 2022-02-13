import { ethers } from "hardhat";
import { Bridge__factory, Bridge } from "../types/index";

async function main() {
  if (!process.env.CONTRACT_ADDRESS) {
    throw new Error(`You must specify a "CONTRACT_ADDRESS" env variable`);
  }

  if (!process.env.CONTRACT_ADDRESS) {
    throw new Error(`You must specify a "CONTRACT_ADDRESS" env variable`);
  }

  if (!process.env.TOKEN_NAME) {
    throw new Error(`You must specify a "TOKEN_NAME" env variable`);
  }

  if (!process.env.TOKEN_SYMBOL) {
    throw new Error(`You must specify a "TOKEN_SYMBOL" env variable`);
  }

  if (!process.env.TOKEN_DECIMALS) {
    throw new Error(`You must specify a "TOKEN_DECIMALS" env variable`);
  }

  if (!process.env.TOKEN_AMOUNT) {
    throw new Error(`You must specify a "TOKEN_AMOUNT" env variable`);
  }

  if (!process.env.RECEIVER) {
    throw new Error(`You must specify a "RECEIVER" env variable`);
  }

  if (!process.env.NATIVE_TOKEN) {
    throw new Error(`You must specify a "NATIVE_TOKEN" env variable`);
  }

  const wallet = (await ethers.getSigners())[0];
  const contract = Bridge__factory.connect(process.env.CONTRACT_ADDRESS, wallet);

  await mint(
    contract,
    process.env.TOKEN_NAME,
    process.env.TOKEN_SYMBOL,
    Number(process.env.TOKEN_DECIMALS),
    process.env.TOKEN_AMOUNT,
    process.env.RECEIVER,
    process.env.NATIVE_TOKEN,
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

async function mint(
  contract: Bridge,
  name: string,
  symbol: string,
  decimals: number,
  amount: string,
  receiver: string,
  nativeToken: string,
): Promise<void> {
  const tx = await contract.functions.mint(
    name,
    symbol,
    decimals,
    ethers.utils.parseEther(amount),
    receiver,
    nativeToken,
  );

  await tx.wait();

  console.log(tx);
  console.log("-----------------------------");
}
