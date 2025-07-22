import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Inject,
	UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand } from './brand.entity';
import { IsAuthGuard } from '../../common/guards/auth.guard';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('brands')
export class BrandController {
	constructor(
		private readonly brandService: BrandService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: Logger,
	) {}

	/**
	 * Get all brands
	 * @return {Brand[]}
	 */
	@UseGuards(IsAuthGuard)
	@Get()
	async getAllBrands(): Promise<Brand[]> {
		try {
			return await this.brandService.getAllBrands();
		} catch (error) {
			this.logger.error(error);
			throw new HttpException(
				'Internal server error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
