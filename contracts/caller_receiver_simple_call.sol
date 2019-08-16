pragma solidity ^0.4.23;

contract Caller {
    Receiver public receiver;

    constructor(Receiver _receiver) public {
        receiver = _receiver;
    }

    function call() public {
        receiver.performAction();
    }
}

contract Receiver {
    event ActionPerformed();

    function performAction() public {
        emit ActionPerformed();
    }
}