import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserBikeMaintenance } from './user-bike-maintenance.entity';
import { CreateUserBikeMaintenanceDto } from './dtos/create-user-bike-maintenance.dto';
import { UserRequest } from '../user/user.entity';
import { UserBikeService } from '../user-bike/user-bike.service';
import { MaintenanceService } from '../maintenance/maintenance.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UserBikeMaintenanceService {
	constructor(
		@InjectRepository(UserBikeMaintenance)
		private readonly userBikeMaintenanceRepository: Repository<UserBikeMaintenance>,
		private readonly userBikeService: UserBikeService,
		private readonly maintenanceService: MaintenanceService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: Logger,
	) {}

	/**
	 * Add new User Bike Maintenance
	 * @param dto { CreateUserBikeMaintenanceDto }
	 * @param userRequest { UserRequest }
	 * @returns { UserBikeMaintenance }
	 */
	async addUserBikeMaintenance(
		dto: CreateUserBikeMaintenanceDto,
		userRequest: UserRequest,
	): Promise<UserBikeMaintenance> {
		try {
			const userBike = await this.userBikeService.getUserBike(
				userRequest.user.id,
				dto.userBike,
			);
			const maintenance =
				await this.maintenanceService.getMaintenanceById(
					dto.maintenance,
				);
			const userBikeMaintenance =
				this.userBikeMaintenanceRepository.create({
					date: dto.date,
					description: dto.description,
					userBike,
					maintenance,
				});
			return await this.userBikeMaintenanceRepository.save(
				userBikeMaintenance,
			);
		} catch (error) {
			this.logger.error(error);
			throw new HttpException(
				'Server Error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	/**
	 * Get all User Bike Maintenances from User Bike
	 * @param userBikeId { String }
	 * @returns { UserBikeMaintenance[] }
	 */
	async getAllUserBikeMaintenancesFromUserBike(
		userBikeId: string,
	): Promise<UserBikeMaintenance[]> {
		try {
			return this.userBikeMaintenanceRepository.find({
				where: { userBike: { id: userBikeId } },
			});
		} catch (error) {
			this.logger.error(error);
			throw new HttpException(
				'Server Error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
