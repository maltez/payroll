import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PaymentEntity} from "../model/payment.entity";
import {InsertResult, Repository} from "typeorm";
import {ApiOperation} from "@nestjs/swagger";

const Web3 = require('web3');
const contract_abi = require('../../ABI/abi.json');

const contract_address = '0xe517d5CCa1284EB1AF5bBa0C02B272F5a28fe491';
const web3 = new Web3('https://godwoken-testnet-v1.ckbapp.dev'); // Your Web3 instance

const colleteralToken = new web3.eth.Contract(contract_abi, contract_address);
const private_key = process.env.PRIVATE_KEY
@Injectable()
export class PaymentService {
    constructor(@InjectRepository(PaymentEntity) private readonly repo: Repository<PaymentEntity>) {
    }

    @ApiOperation({summary: 'Get all payments'})
    public async getAll() {
        return await this.repo.find();
    }

    @ApiOperation({summary: 'Get  balance'})
    public async getBalance(id: string) {
        return  await colleteralToken.methods.balanceOf(id['id']).call();
    }

    @ApiOperation({summary: 'Mint'})
    public async mint(@Body() address: string): Promise<InsertResult> {
        const to = address['address']
        const trans = colleteralToken.methods.mint(to, web3.utils.toWei('100', 'ether')).encodeABI();
        const createTransaction = await web3.eth.accounts.signTransaction(
            {
                to: contract_address,
                value: 0,
                gas: '210000',
                data: trans,
                gasPrice: 10 ** 9
            },
            private_key
        );

        const balance = await colleteralToken.methods.balanceOf(contract_address).call();

        await web3.eth.sendSignedTransaction(createTransaction.rawTransaction)
        return balance
    }

    @ApiOperation({summary: 'Create payment'})
    public async create(@Body() create: PaymentEntity): Promise<InsertResult> {
        const trans = colleteralToken.methods.transfer(create.wallet_id, web3.utils.toWei(`${create.value}`, 'ether')).encodeABI();
        const createTransaction = await web3.eth.accounts.signTransaction(
            {
                to: contract_address,
                value: 0,
                gas: '210000',
                data: trans,
                gasPrice: 10 ** 9
            },
            create.payer_secret_id
        );

        await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
        return this.repo.insert(create);
    }

    @ApiOperation({summary: 'Get by organization by ID'})
    public async findById(id: number): Promise<PaymentEntity[]> {
        return await this.repo.findByIds([id]);
    }
}
