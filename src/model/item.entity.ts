import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'item' })
export class Item {

    @ApiProperty({example: "18885ef6-199c-492b-989f-7affdbf5f342"})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example: 'John', description: 'Name of the person.'})
    @Column({ type: 'varchar', length: 300 })
    name: string;

    @ApiProperty({example:'Very smart', description: 'Description of the person.'})
    @Column({ type: 'varchar', length: 300 })
    description: string;
}
