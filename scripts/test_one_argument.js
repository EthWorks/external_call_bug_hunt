(async () => {
  const ethers = require('ethers');
  const waffle = require('ethereum-waffle');
  const CallerContract = require('./abi/CallerOne.json');
  const ReceiverContract = require('./abi/ReceiverOne.json');

  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  const privateKey = '0x4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7';
  const wallet = new ethers.Wallet(privateKey, provider);

  const receiverContract = await waffle.deployContract(wallet, ReceiverContract);
  const receiverInterface = new ethers.utils.Interface(ReceiverContract.abi);
  const callerContract = await waffle.deployContract(wallet, CallerContract, [receiverContract.address]);

  const address1 = '0xf4f01b758D441Bd097B6F09F44440Ff7Cb89dcBB';
  let hash;

  try {
    const tx = await callerContract.call(address1);
    hash = tx.hash;
  } catch (error) {
    console.log('FAILURE (transaction failed)');
    return 1;
  }


  const receipt = await provider.getTransactionReceipt(hash);
  const parsedEvent = receiverInterface.parseLog(receipt.logs[0]);

  if( parsedEvent.values.addr1 === address1) {
      console.log('SUCCESS');
      return 0;
  } else {
    console.log('FAILURE (wrong value)');
    return 1;
  }
})()