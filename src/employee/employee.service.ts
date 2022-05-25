import {Body, Injectable} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeEntity } from "../model/employee.entity";
import {InsertResult, Repository} from "typeorm";
import {ApiOperation} from "@nestjs/swagger";

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(EmployeeEntity) private readonly repo: Repository<EmployeeEntity>) {
    }

    @ApiOperation({ summary: 'Get all employees' })
    public async getAll() {
        return await this.repo.find();
    }

    @ApiOperation({ summary: 'Create employee' })
    public async create(@Body() create: EmployeeEntity): Promise<InsertResult>  {
        return this.repo.insert(create);
    }

    @ApiOperation({ summary: 'Get by ID' })
    public async findById(id: number): Promise<EmployeeEntity[]>  {
        console.log(id)
        return await this.repo.findByIds([id]);
    }
}
