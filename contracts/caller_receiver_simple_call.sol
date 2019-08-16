pragma solidity ^0.4.23;

contract CallerSimple {
    ReceiverSimple public receiver;

    constructor(ReceiverSimple _receiver) public {
        receiver = _receiver;
    }

    function call() public {
        receiver.performAction();
    }
}

contract ReceiverSimple {
    function performAction() public {
    }
}