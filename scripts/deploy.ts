import { ethers } from "hardhat";

import { Bridge__factory, Bridge } from "../types/index";

async function main() {
  await deployBridge();
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

async function deployBridge(): Promise<string> {
  const factory: Bridge__factory = (await ethers.getContractFactory("Bridge")) as Bridge__factory;
  const targetBridge: Bridge = await factory.deploy();
  await targetBridge.deployed();

  console.log("Bridge deployed to: ", targetBridge.address);

  return targetBridge.address;
}
