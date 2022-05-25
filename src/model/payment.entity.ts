import {Entity, Column} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'payment' })
export class PaymentEntity extends BaseEntity {
    @ApiProperty({example: 'Pending', description: 'Status of payment.'})
    @Column({ type: 'varchar', length: 20 })
    status: string;

    @ApiProperty({example: 123, description: 'Wallet id of the organization.'})
    @Column({ type: 'int' })
    organization_wallet_id: number;

    @ApiProperty({example: 123, description: 'Wallet id of the person.'})
    @Column({ type: 'int' })
    wallet_id: number;
}