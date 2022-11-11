import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MissingPeople } from "../typechain-types";

describe("MissingPeople", function () {
    enum Resolution {
        LIVE = 0,
        DEAD = 1,
        UNKNOW = 2,
        SEARCHING = 3
    }
    enum CommonColors {
        BLACK = 0, BROWN = 1, BLUE = 2, GREEN = 3, OTHER = 4
    }
    enum Genre {
        MALE = 0, FEMALE = 1 , OTHER = 2 
    }
    let location = [{lat: ('19.9273172'), long :'-97.9658038', radius: '-6.33'}];

    async function createSingleReport() {
        const {peopleContract, owner, otherAccount}  = await (await loadFixture(deployPeopleFixture));
        await peopleContract.createReport(location, {
            eyes: CommonColors.BLACK,
            hair: CommonColors.BLACK,
            sex: Genre.FEMALE,
            name: "Rick",
            birthDate: 2,
            nationality: "some",
            weight: 3,
            height :5,
            remarks: 'Rainwalker has a slight speech impediment and pronounces the letter "r" like a "w".',
            images: []
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
            const coordinates = await peopleContract.reportCoordinates(0, 0);
            expect(await coordinates.long).to.equal(location[0].long);
            expect(await coordinates.lat).to.equal(location[0].lat);
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
             peopleContract  = await ((await createSingleReport()).peopleContract);
        });

        it("Should create a new register ", async () => {
            const description = "Some terrible situation";
            await expect(peopleContract.createFollowup(description, 0))
                .to.emit(peopleContract,"CaseFollowup");
            const follorupReports = await peopleContract.getFollowupReports(0);
            expect(follorupReports.length).to.equal(1);
        });
    });
});
