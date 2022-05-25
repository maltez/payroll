import {Body, Injectable} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentEntity } from "../model/payment.entity";
import {InsertResult, Repository} from "typeorm";
import {ApiOperation} from "@nestjs/swagger";

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(PaymentEntity) private readonly repo: Repository<PaymentEntity>) {
    }

    @ApiOperation({ summary: 'Get all payments' })
    public async getAll() {
        return await this.repo.find();
    }

    @ApiOperation({ summary: 'Create payment' })
    public async create(@Body() create: PaymentEntity): Promise<InsertResult>  {
        return this.repo.insert(create);
    }

    @ApiOperation({ summary: 'Get by organization by ID' })
    public async findById(id: number): Promise<PaymentEntity[]>  {
        return await this.repo.findByIds([id]);
    }
}
