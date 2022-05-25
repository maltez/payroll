import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {OrganizationService } from "./organization.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {OrganizationEntity} from "../model/organization.entity";

@Controller('organization')
export class OrganizationController {
    constructor(private serv: OrganizationService) { }

    @Get()
    @ApiOperation({ summary: 'Get all employees' })
    public async getAll() {
        return await this.serv.getAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create item' })
    public async create(@Body() employee: OrganizationEntity) {
        return await this.serv.create(employee);
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: OrganizationEntity,
    })
    public async findOne(@Param() id: number): Promise<OrganizationEntity[]>{
        return await this.serv.findById(id);
    }
}
