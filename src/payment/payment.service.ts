import {Body, Injectable} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentEntity } from "../model/payment.entity";
import {InsertResult, Repository} from "typeorm";
import {ApiOperation} from "@nestjs/swagger";
require('dotenv').config();

const Web3 = require('web3');

const privKey  = process.env.PRIVATE_KEY // Your  key
const web3 = new Web3('http://127.0.0.1:9545'); // Your Web3 instance
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
    public async getBalance(id: string) {
        const balances = async () => {
            const balanceFrom = web3.utils.fromWei(
                await web3.eth.getBalance(id),
                'ether'
            );

            return balanceFrom;
        };

        return balances();
    }

    @ApiOperation({ summary: 'Create payment' })
    public async create(@Body() create: PaymentEntity): Promise<InsertResult>  {
        const deploy = async () => {
            const createTransaction = await web3.eth.accounts.signTransaction(
                {
                    from: create.organization_wallet_id,
                    to: create.wallet_id,
                    value: web3.utils.toWei(`${create.value}`, 'ether'),
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
