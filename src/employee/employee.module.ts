import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeEntity } from '../model/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity])],
    providers: [EmployeeService],
    controllers: [EmployeeController],
    exports: []
})
export class EmployeeModule { }