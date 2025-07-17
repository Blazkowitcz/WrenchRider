import { Controller, Get } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand } from './brand.entity';

@Controller('brands')
export class BrandController {
	constructor(private readonly brandService: BrandService) {}

	@Get()
	async getAllBrands(): Promise<Brand[]> {
		const brands = await this.brandService.getAllBrands();
		return brands;
	}
}
