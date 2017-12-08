import {BigNumber} from 'bignumber.js';
import * as Web3 from 'web3';

export interface TxData {
    from?: string;
    gas?: number;
    gasPrice?: BigNumber;
    nonce?: number;
}

export interface TransactionReceipt {
    blockHash: string;
    blockNumber: number;
    transactionHash: string;
    transactionIndex: number;
    from: string;
    to: string;
    status: null|0|1;
    cumulativeGasUsed: number;
    gasUsed: number;
    contractAddress: string|null;
    logs: Web3.LogEntry[];
}
