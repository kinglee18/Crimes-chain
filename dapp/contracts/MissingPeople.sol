// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract MissingPeople {
    event CaseClosed(uint date, Resolution resolution);

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
        string name;
        uint birthDate;
        string nationality;
        uint height;
        uint width;
    }

    struct Coordinate {
        string lat;
        string long;
    }

    struct Report {
        uint id;
        address reporter;
        Coordinate crimeLocation;
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

    mapping(uint => FollowUpReport[]) public followUpReports;
    uint followUpReportsCount = 0;

    Report [] public crimeReports;
    
    function createReport(Coordinate memory location,  Person memory missingPerson) public{
        Report memory report = Report({
            resolution: Resolution.SEARCHING,
            id: crimeReports.length,
            created : block.timestamp,
            reporter: msg.sender,
            crimeLocation: location,
            missingPerson: missingPerson
        });
        crimeReports.push(report);
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
        followUpReports[id].push (report);
        followUpReportsCount++;
    }
}
