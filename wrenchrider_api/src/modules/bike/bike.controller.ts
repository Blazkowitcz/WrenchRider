import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BikeService } from './bike.service';
import { Bike } from './bike.entity';
import { IsAuthGuard } from '../../common/guards/auth.guard';

@Controller('bikes')
export class BikeController {
	constructor(private bikeService: BikeService) {
	}

	/**
	 * Get all bikes from a brand
	 * @param brandId {String}
	 * @return {Bike[]}
	 */
	@UseGuards(IsAuthGuard)
	@Get('/brand/:brandId')
	async getBikesFromBrand(
		@Param('brandId') brandId: string,
	): Promise<Bike[]> {
		return this.bikeService.getAllBikesFromBrand(brandId);
	}
}
