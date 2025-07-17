import { IsString, IsNumber, IsObject } from 'class-validator';

export class CreateBikeDto {
	@IsString()
	name: string;

	@IsObject()
	brand: object;

	@IsNumber()
	power: number;

	@IsNumber()
	year: number;
}
