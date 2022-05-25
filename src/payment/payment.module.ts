import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentEntity } from '../model/payment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentEntity])],
    providers: [PaymentService],
    controllers: [PaymentController],
    exports: []
})
export class PaymentModule { }