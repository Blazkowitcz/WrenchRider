import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Inject,
	Param,
	UseGuards,
} from '@nestjs/common';
import { BikeService } from './bike.service';
import { Bike } from './bike.entity';
import { IsAuthGuard } from '../../common/guards/auth.guard';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('bikes')
export class BikeController {
	constructor(
		private bikeService: BikeService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: Logger,
	) {}

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
		try {
			return this.bikeService.getAllBikesFromBrand(brandId);
		} catch (error) {
			this.logger.error(error);
			throw new HttpException(
				'Internal server error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
