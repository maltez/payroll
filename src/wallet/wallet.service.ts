import {Body, Injectable} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { WalletEntity } from "../model/wallet.entity";
import {InsertResult, Repository} from "typeorm";
import {ApiOperation} from "@nestjs/swagger";

@Injectable()
export class WalletService {
    constructor(@InjectRepository(WalletEntity) private readonly repo: Repository<WalletEntity>) {
    }

    @ApiOperation({ summary: 'Get all wallets' })
    public async getAll() {
        return await this.repo.find();
    }

    @ApiOperation({ summary: 'Create wallet' })
    public async create(@Body() create: WalletEntity): Promise<InsertResult>  {
        return this.repo.insert(create);
    }

    @ApiOperation({ summary: 'Get by organization by ID' })
    public async findById(id: number): Promise<WalletEntity[]>  {
        return await this.repo.findByIds([id]);
    }
}
