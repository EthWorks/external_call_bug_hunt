(async () => {
  const ethers = require('ethers');
  const waffle = require('ethereum-waffle');
  const CallerContract = require('./abi/Caller.json');
  const ReceiverContract = require('./abi/Receiver.json');

  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  const privateKey = '0x4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7';
  const wallet = new ethers.Wallet(privateKey, provider);

  const receiverContract = await waffle.deployContract(wallet, ReceiverContract);
  const callerContract = await waffle.deployContract(wallet, CallerContract, [receiverContract.address]);
  
  try {
    const tx = await callerContract.call();
    hash = tx.hash;
  } catch (error) {
    console.log('FAILURE (transaction failed)');
    return 1;
  }
  console.log('SUCCESS');
  return 0;
})()