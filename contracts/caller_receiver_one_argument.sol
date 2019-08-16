pragma solidity ^0.4.23;

contract CallerOne {
    ReceiverOne public receiver;

    constructor(ReceiverOne _receiver) public {
        receiver = _receiver;
    }

    function call(address addr1) public {
        receiver.performAction(addr1);
    }
}

contract ReceiverOne {
    event ActionPerformed(address addr1);

    function performAction(address addr1) public {
        emit ActionPerformed(addr1);
    }
}