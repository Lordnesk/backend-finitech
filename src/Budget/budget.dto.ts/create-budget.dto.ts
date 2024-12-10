import { IsNumber, IsString, IsNotEmpty, IsOptional, IsDateString } from "class-validator";

export class CreateBudgetDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    @IsString()
    amount: number;

    @IsNumber()
    @IsString()
    availableId: number;  // El ID del presupuesto disponible (Available)

    @IsNotEmpty()
    @IsDateString()
    durationDate: string;
}

export class UpdateBudgetDto {
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsNumber()
    @IsString()
    amount?: number;

    @IsNumber()
    @IsString()
    availableId?: number;

    @IsOptional()
    @IsDateString()
    durationDate?: string;
}