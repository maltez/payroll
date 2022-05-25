import {Body, Injectable} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { OrganizationEntity } from "../model/organization.entity";
import {InsertResult, Repository} from "typeorm";
import {ApiOperation} from "@nestjs/swagger";

@Injectable()
export class OrganizationService {
    constructor(@InjectRepository(OrganizationEntity) private readonly repo: Repository<OrganizationEntity>) {
    }

    @ApiOperation({ summary: 'Get all organizations' })
    public async getAll() {
        return await this.repo.find();
    }

    @ApiOperation({ summary: 'Create organization' })
    public async create(@Body() create: OrganizationEntity): Promise<InsertResult>  {
        return this.repo.insert(create);
    }

    @ApiOperation({ summary: 'Get by organization by ID' })
    public async findById(id: number): Promise<OrganizationEntity[]>  {
        return await this.repo.findByIds([id]);
    }
}
