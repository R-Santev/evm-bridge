import { ethers } from "hardhat";
import { TargetChainBridge__factory, TargetChainBridge } from "../types/index";

async function main() {
  await deployTargetBridge();
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

async function deployTargetBridge(): Promise<string> {
  const factory: TargetChainBridge__factory = (await ethers.getContractFactory(
    "TargetChainBridge",
  )) as TargetChainBridge__factory;
  const targetBridge: TargetChainBridge = await factory.deploy();
  await targetBridge.deployed();

  console.log("TargetChainBridge deployed to: ", targetBridge.address);

  return targetBridge.address;
}
