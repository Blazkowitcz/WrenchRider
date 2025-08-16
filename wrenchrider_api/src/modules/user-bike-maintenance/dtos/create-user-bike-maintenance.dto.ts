import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateUserBikeMaintenanceDto {
	@IsString()
	userBike: string;

	@IsString()
	maintenance: string;

	@IsDate()
	date: Date;

	@IsOptional()
	@IsString()
	description: string;
}
