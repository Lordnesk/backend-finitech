import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AvailableService } from './monthly-budget.service';
import { CreateAvailableDto, UpdateAvailableDto } from './dto/aviable.dto';


@Controller('Available')
export class AvailableController {
  constructor(private readonly availableService: AvailableService) {}

  @Post()
  async createAvailable(@Body() createAvailableDto: CreateAvailableDto) {
    return this.availableService.createAvailable(createAvailableDto);
  }

  @Get()
  async getAvailable() {
    return this.availableService.getAvailables();
  }

  @Get(':id')
  async getMainAmountById(@Param('id') id: number) {
    return this.availableService.getAvailableById(id);
  }

  @Put(':id')
  async updateMainAmount(@Param('id') id: number, @Body() updateMainAmountDto: UpdateAvailableDto) {
    return this.availableService.updateAvailable(id, updateMainAmountDto);
  }

  @Delete(':id')
  async deleteMainAmount(@Param('id') id: number) {
    await this.availableService.deleteAvailable(id);
    return { message: `MainAmount with ID ${id} deleted successfully.` };
  }
}


