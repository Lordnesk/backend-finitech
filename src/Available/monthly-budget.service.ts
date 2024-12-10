import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Available } from './entity/monthly-budget.entity';
import { CreateAvailableDto, UpdateAvailableDto } from './dto/aviable.dto';


@Injectable()
export class AvailableService {
  constructor(
    @InjectRepository(Available)
    private readonly availableRepository: Repository<Available>,
  ) {}

  async createAvailable(createAvailableDto: CreateAvailableDto): Promise<Available> {
    const { startDate, endDate, ...data } = createAvailableDto;
    const available = this.availableRepository.create({
      ...data,
      startDate,
      endDate,
    });

    return this.availableRepository.save(available);
  }

  async getAvailables(): Promise<Available[]> {
    return this.availableRepository.find();
  }

  async getAvailableById(id: number): Promise<Available> {
    const available = await this.availableRepository.findOne({ where: { id } });
    if (!available) {
      throw new NotFoundException(`Available with ID ${id} not found.`);
    }
    return available;
  }

  async updateAvailable(id: number, updateAvailableDto: UpdateAvailableDto): Promise<Available> {
    const available = await this.getAvailableById(id);
    if (!available){
      throw new NotFoundException(`Available with ID ${id} not found.`);
    }

    const { startDate, endDate, ...data } = updateAvailableDto;
    if (startDate) available.startDate = startDate;
    if (endDate) available.endDate = endDate;

    Object.assign(available, updateAvailableDto);
    return this.availableRepository.save(available);
  }

  async deleteAvailable(id: number): Promise<void> {
    const result = await this.availableRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Available with ID ${id} not found.`);
    }
  }
}

