// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract MissingPeople {
    address public reporter;
    uint created;

    event CaseClosed(uint date);
    enum Sizes {
        SMALL, MEDIUM, LARGE, BIG
    }
    enum EyeColors {
        BLACK, BROWN, BLUE, GREEN
    }
    enum HairColor {
        BLACK, RED
    }
    struct Face {
        HairColor hairCOLOR;
    }
    struct People {
        EyeColors eyes;
    }

    struct Coordinate {
        uint256 lat;
        uint256 long;
    }

    constructor() {
        created = block.timestamp;
        reporter = msg.sender;
    }

    function closeCase() public {
        require(msg.sender == reporter, "You cannot close this request");
        emit CaseClosed(block.timestamp);
    }
}
