(async () => {
  const ethers = require('ethers');
  const waffle = require('ethereum-waffle');
  const CallerContract = require('./abi/Caller.json');
  const ReceiverContract = require('./abi/Receiver.json');

  const provider = waffle.createMockProvider();
  const [{privateKey}] = waffle.getWallets(provider);
  const wallet = new ethers.Wallet(privateKey, provider);

  const receiverContract = await waffle.deployContract(wallet, ReceiverContract);
  const receiverInterface = new ethers.utils.Interface(ReceiverContract.abi);
  const callerContract = await waffle.deployContract(wallet, CallerContract, [receiverContract.address]);

  const address1 = '0xf4f01b758D441Bd097B6F09F44440Ff7Cb89dcBB';
  const address2 = '0xCbAb86291665c86A506c6275Ec517C10CF8841CD';
  const number = '646';
  let hash;

  try {
    const tx = await callerContract.call(address1, address2, number);
    hash = tx.hash;
  } catch (error) {
    console.log('FAILURE (transaction failed)');
    return 1;
  }


  const receipt = await provider.getTransactionReceipt(hash);
  const parsedEvent = receiverInterface.parseLog(receipt.logs[0]);

  if( parsedEvent.values.number.toString() === number
    && parsedEvent.values.addr2 === address2
    && parsedEvent.values.addr1 === address1) {
      console.log('SUCCESS');
      return 0;
  } else {
    console.log('FAILURE (wrong value)');
    return 1;
  }
})()