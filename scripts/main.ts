import { ethers } from "hardhat";
import { SourceChainBridge__factory, SourceChainBridge, Token, Token__factory } from "../types/index";

async function main() {
  const tokenAddress = await deployToken("Test Value", "TEST", 18);
  await deploySourceBridge();
  // const targetBridge = await deployTargetBridge();

  const wallet = (await ethers.getSigners())[0];

  const tokenContract = Token__factory.connect(tokenAddress, wallet);

  await mintSourceTokens(tokenContract, wallet.address);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

async function deployToken(name: string, symbol: string, decimals: number): Promise<string> {
  const factory: Token__factory = (await ethers.getContractFactory("Token")) as Token__factory;
  const token: Token = await factory.deploy(name, symbol, decimals);
  await token.deployed();

  console.log("Token deployed to: ", token.address);
  return token.address;
}

async function deploySourceBridge(): Promise<string> {
  const factory: SourceChainBridge__factory = (await ethers.getContractFactory(
    "SourceChainBridge",
  )) as SourceChainBridge__factory;
  const sourceBridge: SourceChainBridge = await factory.deploy();
  await sourceBridge.deployed();

  console.log("SourceChainBridge deployed to: ", sourceBridge.address);

  return sourceBridge.address;
}

async function mintSourceTokens(contract: Token, userAddress: string): Promise<void> {
  const tx = await contract.functions.mint(userAddress, ethers.utils.parseEther("101.552"));
  console.log("-----------------------------");
  console.log(tx.hash);
}
