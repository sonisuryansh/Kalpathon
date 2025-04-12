// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GovChain {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct CitizenInfo {
        string name;
        string governmentID;
        uint256 timestamp;
    }

    mapping(address => CitizenInfo) public citizens;

    event CitizenRegistered(
        address indexed user,
        string name,
        string governmentID,
        uint256 timestamp
    );

    modifier onlyUser() {
        require(msg.sender != address(0), "Invalid user");
        _;
    }

    function registerCitizen(string memory _name, string memory _governmentID) public onlyUser {
        citizens[msg.sender] = CitizenInfo({
            name: _name,
            governmentID: _governmentID,
            timestamp: block.timestamp
        });

        emit CitizenRegistered(msg.sender, _name, _governmentID, block.timestamp);
    }

    function getMyData() public view returns (CitizenInfo memory) {
        return citizens[msg.sender];
    }

    function getUserData(address _user) public view returns (CitizenInfo memory) {
        require(msg.sender == owner, "Only admin can view others' data");
        return citizens[_user];
    }
}
