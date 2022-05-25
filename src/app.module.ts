import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { configService } from './config/config.service'
import { EmployeeModule } from './employee/employee.module'
import {OrganizationModule} from "./organization/organization.module";
import { PaymentModule } from './payment/payment.module';
import {WalletModule} from "./wallet/wallet.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      EmployeeModule,
      OrganizationModule,
      PaymentModule,
      WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
