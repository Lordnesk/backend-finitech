import { IsNumber, IsNotEmpty, IsString, IsOptional, IsDateString } from "class-validator";

export class CreateAvailableDto{
    @IsOptional()
    @IsDateString()
    startDate: string; 

    @IsOptional()
    @IsDateString()
    endDate: string; 

    @IsNotEmpty()
    @IsNumber()
    totalAmount: number;
}

export class UpdateAvailableDto {
    @IsOptional()
    @IsDateString()
    startDate?: string; 
    
    @IsOptional()
    @IsDateString()
    endDate?: string; 

    @IsOptional()
    @IsNumber()
    totalAmount?: number;

    // Agrega otros campos según sea necesario
}