import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import {WalletEntity} from "../model/wallet.entity";

@Module({
    imports: [TypeOrmModule.forFeature([WalletEntity])],
    providers: [WalletService],
    controllers: [WalletController],
    exports: []
})
export class WalletModule { }