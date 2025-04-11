// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GovChain {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Citizen {
        uint256 age;
        uint256 income;
        string region;
        string education;
        string[] schemes;
        uint256 timestamp;
    }

    mapping(address => Citizen[]) public citizenData;

    event EligibilityStored(
        address indexed user,
        uint256 age,
        uint256 income,
        string region,
        string education,
        string[] schemes,
        uint256 timestamp
    );

    modifier onlyUser() {
        require(msg.sender != address(0), "Invalid user");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only admin can call");
        _;
    }

    function storeEligibility(
        uint256 _age,
        uint256 _income,
        string memory _region,
        string memory _education,
        string[] memory _schemes
    ) public onlyUser {
        Citizen memory newEntry = Citizen({
            age: _age,
            income: _income,
            region: _region,
            education: _education,
            schemes: _schemes,
            timestamp: block.timestamp
        });

        citizenData[msg.sender].push(newEntry);
        emit EligibilityStored(msg.sender, _age, _income, _region, _education, _schemes, block.timestamp);
    }

    function getMyRecords() public view returns (Citizen[] memory) {
        return citizenData[msg.sender];
    }

    function getUserRecords(address user) public view onlyOwner returns (Citizen[] memory) {
        return citizenData[user];
    }
}
