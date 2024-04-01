import { Web3Eth } from 'web3-eth';
import { fromWei } from 'web3-utils';

const eth = new Web3Eth(Web3Eth.givenProvider || 'https://mainnet.infura.io/v3/' + process.env.INFURA_PROJECT_ID);

export class Task5Service {
    public async getAccountBalanceS(account: string) {
        return eth.getBalance(account).then(balance => fromWei(balance, 'ether'));
    }
}