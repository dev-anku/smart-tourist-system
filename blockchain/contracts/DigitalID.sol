// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DigitalID {
    struct ID {
        string idHash;
        string evidence; // URL or IPFS hash of document/photo
    }

    mapping(address => ID) public users;

    event IDCreated(address user, string idHash, string evidence);

    function createID(string memory _idHash, string memory _evidence) public {
        require(bytes(users[msg.sender].idHash).length == 0, "ID already exists");
        users[msg.sender] = ID(_idHash, _evidence);
        emit IDCreated(msg.sender, _idHash, _evidence);
    }

    function getID(address _user) public view returns (string memory, string memory) {
        ID memory id = users[_user];
        return (id.idHash, id.evidence);
    }
}
