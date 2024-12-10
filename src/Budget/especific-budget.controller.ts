import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BudgetService } from './especific-budget.service';
import { CreateBudgetDto, UpdateBudgetDto } from './budget.dto.ts/create-budget.dto';



@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  async getBudgets() {
    return this.budgetService.getBudgets();
  }

  @Post()
  async createBudget(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.createBudget(createBudgetDto);
  }

  @Put(':id')
  async updateBudget(@Param('id') id: number, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetService.updateBudget(id, updateBudgetDto);
  }

  @Delete(':id')
  async deleteBudget(@Param('id') id: number) {
    this.budgetService.deleteBudget(id);
    return { message: `Budget with ID ${id} deleted successfully.` }
  }

}

