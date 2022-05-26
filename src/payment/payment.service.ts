import {Body, Injectable} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentEntity } from "../model/payment.entity";
import {InsertResult, Repository} from "typeorm";
import {ApiOperation} from "@nestjs/swagger";
require('dotenv').config();

const Web3 = require('web3');

const privKey  = process.env.PRIVATE_KEY // Your  key
const addressFrom = '0xe9D3F501B082Ba426b4Fb1be6b00be64D486d4d9';
const addressTo = '0x104BE074AD7bB0357258e9aFe9b8E0a58C551833';
const web3 = new Web3('https://godwoken-testnet-v1.ckbapp.dev'); // Your Web3 instance
@Injectable()
export class PaymentService {
    constructor(@InjectRepository(PaymentEntity) private readonly repo: Repository<PaymentEntity>) {
    }

    @ApiOperation({ summary: 'Get all payments' })
    public async getAll() {
        return await this.repo.find();
    }

    @ApiOperation({ summary: 'Get  KEY' })
    public async getKey() {
        return privKey;
    }

    @ApiOperation({ summary: 'Get  balance' })
    public async getBalance() {
        const balances = async () => {
            const balanceFrom = web3.utils.fromWei(
                await web3.eth.getBalance(addressFrom),
                'ether'
            );
            const balanceTo = await web3.utils.fromWei(
                await web3.eth.getBalance(addressTo),
                'ether'
            );

            console.log(`The balance of ${addressFrom} is: ${balanceFrom} ETH.`);
            console.log(`The balance of ${addressTo} is: ${balanceTo} ETH.`);

            return `The balance of ${addressFrom} is: ${balanceFrom} ETH.` + `The balance of ${addressTo} is: ${balanceTo} ETH.`;

        };

        return balances();
    }

    @ApiOperation({ summary: 'Create payment' })
    public async create(@Body() create: PaymentEntity): Promise<InsertResult>  {
        const deploy = async () => {
            console.log(
                `Attempting to make transaction from ${addressFrom} to ${addressTo}`
            );

            const createTransaction = await web3.eth.accounts.signTransaction(
                {
                    from: addressFrom,
                    to: addressTo,
                    value: web3.utils.toWei('1', 'ether'),
                    gas: '21000',
                },
                privKey
            );
            console.log('1 step done', createTransaction.eth_sendRawTransaction)
            // Deploy transaction
            const createReceipt = await web3.eth.sendSignedTransaction(
                createTransaction.rawTransaction
            );
            console.log('2 step done')

            const infoTx = await web3.eth.getTransaction(createReceipt.transactionHash)
            console.log('3 step done')

            return infoTx;
        };
        deploy();


        return this.repo.insert(create);
    }

    @ApiOperation({ summary: 'Get by organization by ID' })
    public async findById(id: number): Promise<PaymentEntity[]>  {
        return await this.repo.findByIds([id]);
    }
}
