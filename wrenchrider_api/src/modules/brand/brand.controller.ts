import { Controller, Get, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand } from './brand.entity';
import { IsAuthGuard } from '../../common/guards/auth.guard';

@Controller('brands')
export class BrandController {
	constructor(private readonly brandService: BrandService) {
	}

	/**
	 * Get all brands
	 * @return {Brand[]}
	 */
	@UseGuards(IsAuthGuard)
	@Get()
	async getAllBrands(): Promise<Brand[]> {
		return await this.brandService.getAllBrands();
	}
}
