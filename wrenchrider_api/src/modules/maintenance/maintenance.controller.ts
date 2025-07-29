import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Inject,
	Param,
	UseGuards,
} from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { Maintenance } from './maintenance.entity';
import { IsAuthGuard } from '../../common/guards/auth.guard';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('maintenances')
export class MaintenanceController {
	constructor(
		private maintenanceService: MaintenanceService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: Logger,
	) {}

	/**
	 * Get all bikes from a brand
	 * @return {Maintenance[]}
	 */
	@UseGuards(IsAuthGuard)
	@Get()
	async getMaintenances(): Promise<Maintenance[]> {
		try {
			return this.maintenanceService.getAllMaintenances();
		} catch (error) {
			this.logger.error(error);
			throw new HttpException(
				'Internal server error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
