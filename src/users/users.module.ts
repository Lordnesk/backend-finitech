import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Available } from 'src/Available/entity/monthly-budget.entity';
import { Budget } from 'src/budget/entity/especific-budget.entity';
import { User } from './entity/users-entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Available, Budget])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

