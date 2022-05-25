import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { WalletService } from "./wallet.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import { WalletEntity } from "../model/wallet.entity";

@Controller('wallet')
export class WalletController {
    constructor(private serv: WalletService) { }

    @Get()
    @ApiOperation({ summary: 'Get all wallets' })
    public async getAll() {
        return await this.serv.getAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create item' })
    public async create(@Body() wallet: WalletEntity) {
        return await this.serv.create(wallet);
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: WalletEntity,
    })
    public async findOne(@Param() id: number): Promise<WalletEntity[]>{
        return await this.serv.findById(id);
    }
}