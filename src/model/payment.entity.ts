import {Entity, Column} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'payment' })
export class PaymentEntity extends BaseEntity {
    @ApiProperty({example: 'Pending', description: 'Status of payment.'})
    @Column({ type: 'varchar', length: 20 })
    status: string;

    @ApiProperty({example: 123, description: 'Wallet id of the organization.'})
    @Column({ type: 'varchar', length: 300 })
    organization_wallet_id: string;

    @ApiProperty({example: 123, description: 'Wallet id of the person.'})
    @Column({ type: 'varchar', length: 300 })
    wallet_id: string;

    @ApiProperty({example: 2.00, description: 'Count of ether in payment.'})
    @Column({ type: 'decimal' })
    value: number;
}