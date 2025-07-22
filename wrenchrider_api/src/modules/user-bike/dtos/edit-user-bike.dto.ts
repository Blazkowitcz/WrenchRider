import { IsString, IsNumber, IsObject, IsOptional } from 'class-validator';

export class EditUserBikeDto {
	@IsOptional()
	@IsObject()
	bike?: object;

	@IsOptional()
	@IsString()
	licence?: string;

	@IsOptional()
	@IsNumber()
	mileage?: number;
}
