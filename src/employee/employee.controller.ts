import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {EmployeeService} from "./employee.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {EmployeeEntity} from "../model/employee.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";

@Controller('employee')
export class EmployeeController {
    constructor(private serv: EmployeeService) { }

    @Get()
    @ApiOperation({ summary: 'Get all employees' })
    public async getAll() {
        return await this.serv.getAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create item' })
    public async create(@Body() employee: EmployeeEntity) {
        return await this.serv.create(employee);
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: EmployeeEntity,
    })
    public async findOne(@Param() id: number): Promise<EmployeeEntity[]>{
        return await this.serv.findById(id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        await this.serv.createFromFile(file.filename);
    }
}
