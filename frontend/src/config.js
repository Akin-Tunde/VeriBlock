import { StacksMainnet, StacksTestnet } from '@stacks/network';

const NETWORK_TYPE = 'testnet'; // Change to 'mainnet' for production

export const CONFIG = {
  networkType: NETWORK_TYPE,
  network: NETWORK_TYPE === 'mainnet' ? new StacksMainnet() : new StacksTestnet(),
  contractAddress: NETWORK_TYPE === 'mainnet' 
    ? 'SP3FBR...' // Your Mainnet Address
    : 'ST1PQHQKV... ', // Your Local/Testnet Address
  contractName: 'notary',
  appDetails: {
    name: 'Decentralized Notary',
    icon: window.location.origin + '/logo.png',
  }
};