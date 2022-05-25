import {Entity, Column} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'organization' })
export class OrganizationEntity extends BaseEntity {
    @ApiProperty({example: 'Magadev', description: 'Name of the organization.'})
    @Column({ type: 'varchar', length: 300 })
    name: string;

    @ApiProperty({example: 123, description: 'Wallet id of the person.'})
    @Column({ type: 'int' })
    wallet_id: number;
}