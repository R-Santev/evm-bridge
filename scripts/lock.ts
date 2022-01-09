import { ethers } from "hardhat";
import { SourceChainBridge__factory, SourceChainBridge } from "../types/index";

async function main() {
  const wallet = (await ethers.getSigners())[0];
  const contract = SourceChainBridge__factory.connect("0x752Ba68ebEcD6b5923F846AE8A029E653c992A6e", wallet);

  await mintSourceTokens(contract);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

async function mintSourceTokens(contract: SourceChainBridge): Promise<void> {
  const tx = await contract.functions.lock(
    97,
    "0xC6Ac68936938441bB941F94C94DFF033F299040D",
    ethers.utils.parseEther("10"),
  );
  console.log("-----------------------------");
  console.log(tx.hash);
}
