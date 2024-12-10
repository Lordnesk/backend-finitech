import { Module } from '@nestjs/common';
import { AvailableModule } from './Available/monthly-budget.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Credentials } from './common/db/db.config';
import { BudgetModule } from './Budget/especific-budget.module';
import { UserModule } from './users/users.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useClass:Credentials
    }),
    AvailableModule,
    BudgetModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
