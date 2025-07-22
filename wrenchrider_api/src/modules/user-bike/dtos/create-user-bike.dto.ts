import { IsString, IsNumber, IsObject } from 'class-validator';

export class CreateUserBikeDto {
	@IsObject()
	user: object;

	@IsObject()
	bike: object;

	@IsString()
	licence: string;

	@IsNumber()
	mileage: number;
}
