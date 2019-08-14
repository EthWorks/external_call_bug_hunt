pragma solidity ^0.4.11;

contract Caller {
    Receiver public receiver;

    constructor(Receiver _receiver) public {
        receiver = _receiver;
    }

    function call(address addr1, address addr2, uint64 number) public {
        receiver.performAction(addr1, addr2, number);
    }
}

contract Receiver {
    event ActionPerformed(address addr1, address addr2, uint64 number);

    function performAction(address addr1, address addr2, uint64 number) public {
        emit ActionPerformed(addr1, addr2, number);
    }
}