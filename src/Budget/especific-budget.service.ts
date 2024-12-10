import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBudgetDto, UpdateBudgetDto } from './budget.dto.ts/create-budget.dto';
import { Budget } from './entity/especific-budget.entity';
import { Available } from 'src/Available/entity/monthly-budget.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
    @InjectRepository(Available)
    private readonly availableRepository: Repository<Available>,
  ) {}

  async createBudget(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const { availableId, durationDate, amount, ...data } = createBudgetDto;
    const available = await this.availableRepository.findOne({ where: { id: availableId } });
    if (!available) {
      throw new NotFoundException('Main amount not found');
    }

    if (available.totalAmount < amount) {
      throw new NotFoundException('Not enough available funds');
    }

    available.totalAmount -= amount;
    await this.availableRepository.save(available)

    const budget = this.budgetRepository.create({ 
      ...data, 
      available,
      durationDate
     });

    return this.budgetRepository.save(budget);
  }

  async getBudgets(): Promise<Budget[]> {
    return this.budgetRepository.find({ relations: ['available'] });
  }

  async updateBudget(id: number, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
  const budget = await this.budgetRepository.findOne({ where: { id }, relations: ['available'] });
  if (!budget) throw new NotFoundException(`Budget with Id ${id} not found.`);

  const { availableId, durationDate, ...data } = updateBudgetDto;
  if (availableId) {
    const available = await this.availableRepository.findOne({ where: { id: availableId } });
    if (!available) throw new NotFoundException('Available amount not found.');
    budget.available = available;
  }

  if (durationDate) {
    budget.durationDate = durationDate; // Actualizar la fecha de duración
  }

  Object.assign(budget, data);
  return this.budgetRepository.save(budget);
}

async deleteBudget(id: number): Promise<void> {
    const budget = await this.budgetRepository.findOne({ where: { id }, relations: ['available'] });
    if (!budget) throw new NotFoundException(`Budget with ID ${id} not found.`);

    // Si se elimina un presupuesto, agregar el monto de vuelta a Available
    const available = budget.available;
    available.totalAmount += budget.amount; // O el campo que almacene el monto
    await this.availableRepository.save(available);

    const result = await this.budgetRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Budget with ID ${id} not found.`);
    }
  }
}
