import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MissingPeople } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("MissingPeople", function () {
    enum Resolution {
        LIVE = 0,
        DEAD = 1,
        UNKNOW = 2,
        SEARCHING = 3
    }
    enum CommonColors {
        BLACK = 0, BROWN = 1, BLUE = 2, GREEN = 3
    }
    enum Genre {
        MALE = 0, FEMALE = 1 , OTHER = 2 
    }
    let location = {lat: ('19.9273172'), long :'-97.9658038'};

    async function createSingleReport() {
        const {peopleContract, owner, otherAccount}  = await (await loadFixture(deployPeopleFixture));
        await peopleContract.createReport(location, {
            eyes: CommonColors.BLACK,
            hair: CommonColors.BLACK,
            sex: Genre.FEMALE,
            name: "Rick",
            birthDate: 2,
            nationality: "some",
            height: 3,
            width :5
        });
        return { peopleContract, owner, otherAccount };
    }

    async function deployPeopleFixture() {
        const [owner, otherAccount] = await ethers.getSigners();
        const MissingPeople = await ethers.getContractFactory("MissingPeople");
        const peopleContract = await MissingPeople.deploy();
        await peopleContract.deployed();
        return { peopleContract, owner, otherAccount };
    }

    describe("Report",   function () {

        it("Should asign the reporter and location", async function () {
            const {peopleContract, owner}  = (await createSingleReport());
            const firstReport = await peopleContract.crimeReports(0);
            expect(await firstReport.reporter).to.equal(owner.address);
            expect(await firstReport.crimeLocation.lat).to.equal(location.lat);
            expect(await firstReport.crimeLocation.long).to.equal(location.long);
            expect(await firstReport.missingPerson.name).to.equal("Rick");
        });

        it("Should revert closecase if user is not reporter", async () => {
            const {peopleContract, otherAccount}  = (await createSingleReport());
            await expect(peopleContract.connect(otherAccount).closeCase(0, Resolution.DEAD)).to.be.revertedWith(
                "You cannot close this request"
            );
        });

        it("Should emit an event if reporter closes the case", async () => {
            const {peopleContract}  = (await createSingleReport());
            await expect(peopleContract.closeCase(0, Resolution.DEAD))
                .to.emit(peopleContract, "CaseClosed").withArgs(time.latestBlock, Resolution.DEAD);
        });
    });

    describe("Follow up", () => {
        let  peopleContract : MissingPeople;

        beforeEach("", async () => {
            const {peopleContract}  = (await createSingleReport());
            
        });

        it("Should create a new register ", async () => {
            const description = "Some terrible situation";
            await peopleContract.createFollowup(description, 0);
            const  a = await peopleContract.followUpReports.call(0);
            console.log(a)
        });
    });
});
