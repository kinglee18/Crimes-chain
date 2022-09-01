import { ethers } from "hardhat";

async function main() {


  const MissingPeople = await ethers.getContractFactory("MissingPeople");
  const peopleContract = await MissingPeople.deploy();
  await peopleContract.deployed();

  console.log(`MissingPeople with  deployed to ${peopleContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
