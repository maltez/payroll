import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { OrganizationEntity } from '../model/organization.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrganizationEntity])],
    providers: [OrganizationService],
    controllers: [OrganizationController],
    exports: []
})
export class OrganizationModule { }