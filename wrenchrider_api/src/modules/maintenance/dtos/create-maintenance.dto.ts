import { IsString, IsNumber, IsObject, IsOptional } from 'class-validator';

export class CreateMaintenanceDto {
	@IsString()
	name: string;

	@IsObject()
	description: string;

	@IsOptional()
	@IsNumber()
	time: number;

	@IsOptional()
	@IsNumber()
	distance: number;
}
