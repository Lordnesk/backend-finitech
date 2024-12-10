import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Available } from './entity/monthly-budget.entity';
import { AvailableService } from './monthly-budget.service';
import { AvailableController } from './monthly-budget.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Available])],
  providers: [AvailableService],
  controllers: [AvailableController],
})
export class AvailableModule {}

