pragma solidity ^0.6.0;

contract MockPerlinX {

    mapping(address => bool) public isAdmin;

    constructor() public {
        isAdmin[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Must be Admin");
        _;
    }

    function addAdmin(address newAdmin) public onlyAdmin {
        isAdmin[newAdmin] = true;
    }

    

}

