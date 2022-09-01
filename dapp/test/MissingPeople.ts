import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MissingPeople", function () {
    async function deployPeopleFixture() {

        const [owner, otherAccount] = await ethers.getSigners();
        const MissingPeople = await ethers.getContractFactory("MissingPeople");
        const peopleContract = await MissingPeople.deploy();
        await peopleContract.deployed();

        return { peopleContract, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should asign the reporter", async function () {
            const { peopleContract, owner } = await loadFixture(deployPeopleFixture);
            expect(await peopleContract.reporter()).to.equal(owner.address);
        });
    });
});
