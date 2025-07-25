import { IsString } from 'class-validator';

export class CreateBrandDto {
	@IsString()
	name: string;

	@IsString()
	color: string;
}
