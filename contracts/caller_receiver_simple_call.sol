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
    event ActionPerformed(address addr);

    function performAction() public {
        address addr = 0xf4f01b758D441Bd097B6F09F44440Ff7Cb89dcBB;
        emit ActionPerformed(addr);
    }
}