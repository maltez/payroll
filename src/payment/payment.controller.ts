import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { PaymentService } from "./payment.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import { PaymentEntity } from "../model/payment.entity";

@Controller('payment')
export class PaymentController {
    constructor(private serv: PaymentService) { }

    @Get()
    @ApiOperation({ summary: 'Get all payments' })
    public async getAll() {
        return await this.serv.getAll();
    }

    @Get('/key')
    @ApiOperation({ summary: 'Get key' })
    public async getKey() {
        return await this.serv.getKey();
    }

    @Get('/balance/:id')
    @ApiOperation({ summary: 'Get key' })
    public async getBalance(@Param() id: string) {
        return await this.serv.getBalance(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create item' })
    public async create(@Body() employee: PaymentEntity) {
        return await this.serv.create(employee);
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: PaymentEntity,
    })
    public async findOne(@Param() id: number): Promise<PaymentEntity[]>{
        return await this.serv.findById(id);
    }
}
