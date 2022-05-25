import {Entity, Column} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'wallet' })
export class WalletEntity extends BaseEntity {
    @ApiProperty({example: 'Nick Wallet', description: 'Wallet name of payment.'})
    @Column({ type: 'varchar', length: 60 })
    name: string;

    @ApiProperty({example: 123, description: 'Wallet id of the organization.'})
    @Column({ type: 'varchar', length: 300 })
    wallet_id: string;

    @ApiProperty({example: 123, description: 'Organization id of the wallet.'})
    @Column({ type: 'int', nullable: true })
    organization_id: number;

    @ApiProperty({example: 123, description: 'Employee id of the wallet.'})
    @Column({ type: 'int', nullable: true })
    employee_id: number;
}