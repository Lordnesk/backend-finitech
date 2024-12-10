import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetService } from './especific-budget.service';
import { Budget } from './entity/especific-budget.entity';
import { Available } from 'src/Available/entity/monthly-budget.entity';
import { BudgetController } from './especific-budget.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, Available])],
  controllers: [BudgetController],
  providers: [BudgetService]
})
export class BudgetModule {}
