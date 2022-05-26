import {Body, Injectable} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeEntity } from "../model/employee.entity";
import {InsertResult, Repository} from "typeorm";
import {ApiOperation} from "@nestjs/swagger";
import {readFileSync} from "fs";
import { parse }  from 'papaparse';

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
        return await this.repo.findByIds([id]);
    }

    public async createFromFile(fileName:string) {
        const csvFile = readFileSync(`./uploads/${fileName}`);
        const csvData = csvFile.toString();

        const parsedCSV = await parse(csvData, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
            complete: (results) => results.data,
        });

        if(parsedCSV.data && parsedCSV.data.length != 0) {
            parsedCSV.data.forEach((item) => {
                    const employee = new EmployeeEntity();
                    employee.name = item['name'];
                    employee.second_name = item['second_name'];
                    employee.description = item['description'];
                    employee.organization_id = item['organization_id'];
                    employee.wallet_id = item['wallet_id'];
                    employee.amount = item['amount'];
                    this.repo.insert(employee);
            });
        }
    }
}
