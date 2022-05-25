import {Entity, Column} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'employee' })
export class EmployeeEntity extends BaseEntity {
    @ApiProperty({example: 'John', description: 'Name of the person.'})
    @Column({ type: 'varchar', length: 300 })
    name: string;

    @ApiProperty({example:'Doe', description: 'Surname of the person.'})
    @Column({ type: 'varchar', length: 300 })
    second_name: string;

    @ApiProperty({example: 'abbd-abbb-dcs', description: 'Wallet id of the person.'})
    @Column({ type: 'varchar', length: 300 })
    wallet_id: string;

    @ApiProperty({example: 123, description: 'Person organization id.'})
    @Column({ type: 'int' })
    organization_id: number;

    @ApiProperty({example: 123, description: 'Person organization id.'})
    @Column({ type: 'decimal'})
    amount: number;
}