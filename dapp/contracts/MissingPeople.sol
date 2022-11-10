// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract MissingPeople {
    event CaseClosed(uint date, Resolution resolution);
    event CaseFollowup();

    enum CommonColors {
        BLACK, BROWN, BLUE, GREEN
    }
    enum Resolution {
        LIVE, DEAD, UNKNOW, SEARCHING
    }
    enum Genre {
        MALE, FEMALE, OTHER
    }

    struct Person {
        CommonColors eyes;
        CommonColors hair;
        Genre sex;
        string remarks;
        string name;
        uint birthDate;
        string nationality;
        uint weight;
        uint width;
        string [] images;
    }

    struct Coordinates {
        string lat;
        string long;
        string radius;
    }

    struct Report {
        uint id;
        address reporter;
        uint created;
        Resolution resolution;
        Person missingPerson;
    }

    struct FollowUpReport {
        string description;
        uint created;
        address reporter;
        uint report;
    }
    
    mapping(uint => Coordinates[])  public reportCoordinates;
    mapping(uint => FollowUpReport[]) public followUpReports;

    Report [] public crimeReports;
    
    function createReport(Coordinates[] memory location,  Person memory missingPerson) public{
        Report memory report = Report({
            resolution: Resolution.SEARCHING,
            id: crimeReports.length,
            created : block.timestamp,
            reporter: msg.sender,
            missingPerson: missingPerson
        });
        crimeReports.push(report);
         for(uint i = 0; i < location.length; i++) {
            reportCoordinates[report.id].push(location[i]);
        }
    }


    function closeCase(uint id, Resolution resolution) public {
        require(msg.sender == crimeReports[id].reporter, "You cannot close this request");
        crimeReports[id].resolution = resolution;
        emit CaseClosed(block.timestamp, resolution);
    }

    function createFollowup (string  memory description, uint id) public {
         FollowUpReport memory report = FollowUpReport({
            description: description,
            created: block.timestamp,
            reporter: msg.sender,
            report: id
        }); 
        followUpReports[id].push(report);
        emit CaseFollowup();
    }

    function getFollowupReports(uint reportId) public view returns( FollowUpReport[] memory){
        return followUpReports[reportId];
    }
    function getCrimeReports() external view returns (Report[] memory) {
        return crimeReports;
    }
}
