import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Maintenance } from './maintenance.entity';
import { CreateMaintenanceDto } from './dtos/create-maintenance.dto';

@Injectable()
export class MaintenanceService {
	constructor(
		@InjectRepository(Maintenance)
		private readonly maintenanceRepository: Repository<Maintenance>,
	) {}

	/**
	 * Add a new maintenance
	 * @param dto {CreateMaintenanceDto}
	 * @returns {Maintenance}
	 */
	async addMaintenance(dto: CreateMaintenanceDto) {
		const maintenance = this.maintenanceRepository.create(dto);
		return this.maintenanceRepository.save(maintenance);
	}

	/**
	 * Get all maintenances
	 * @returns {Maintenance[]}
	 */
	async getAllMaintenances(): Promise<Maintenance[]> {
		return this.maintenanceRepository.find();
	}

	/**
	 * Get maintenance by its id
	 * @param id
	 */
	async getMaintenanceById(id: string) {
		const maintenance = await this.maintenanceRepository.findOne({
			where: { id: id },
		});
		if (maintenance) {
			return maintenance;
		}
		throw new NotFoundException();
	}
}
