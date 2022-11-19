// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MissingPeople is ChainlinkClient {
    IERC20 _token = IERC20(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    using Chainlink for Chainlink.Request;
    
    uint256 public linkPrice;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() {
        address mumbaiLINKContract = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
    setChainlinkToken(mumbaiLINKContract);
    
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
        oracle = 0x40193c8518BB267228Fc409a613bDbD8eC5a97b3;
        fee = 0.1 * 10 ** 18;
    }


receive() external payable {}
    function requestTokenPrice() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", "https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD");
        request.add("path", "USD");
        request.addInt("times", 100);
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill (bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId) {
        linkPrice = _price;
    }

    function sendReward (uint report, uint id) public  {
        followUpReports[report][id].paid = true;
        if (linkPrice  <= 20){
            sendToken(followUpReports[report][id].reporter, 1);
        } else {
            sendToken(followUpReports[report][id].reporter, 2);
        }
    }

    function sendToken (address to, uint256 amount) public  {
        _token.transfer( to, amount);
    }
    
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
        Genre genre;
        string remarks;
        string name;
        uint birthDate;
        string nationality;
        uint weight;
        uint height;
        string [] images;
    }

    struct Coordinates {
        string lat;
        string lng;
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
        bool paid;
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
            report: id,
            paid: false
        }); 
        followUpReports[id].push(report);
        requestTokenPrice();
        emit CaseFollowup();
    }

    function getFollowupReports(uint reportId) public view returns( FollowUpReport[] memory){
        return followUpReports[reportId];
    }
    function getCrimeReports() external view returns (Report[] memory) {
        return crimeReports;
    }
    function getAllReportCoordinates (uint id) external view returns (Coordinates[] memory) {
        return reportCoordinates[id];
    }
}
