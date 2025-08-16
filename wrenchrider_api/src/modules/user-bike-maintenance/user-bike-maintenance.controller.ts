import {
	Controller,
	Post,
	Body,
	Req,
	UseGuards,
	Get,
	Param,
} from '@nestjs/common';
import { UserBikeMaintenanceService } from './user-bike-maintenance.service';
import { UserBikeMaintenance } from './user-bike-maintenance.entity';
import { UserRequest } from '../user/user.entity';
import { IsAuthGuard } from '../../common/guards/auth.guard';
import { CreateUserBikeMaintenanceDto } from './dtos/create-user-bike-maintenance.dto';

@Controller('user-bike-maintenance')
export class UserBikeMaintenanceController {
	constructor(private readonly userBikeService: UserBikeMaintenanceService) {}

	/**
	 * Add user bike maintenance
	 * @param request
	 * @param createUserBikeMaintenanceDto
	 */
	@UseGuards(IsAuthGuard)
	@Post()
	async addUserBikeMaintenance(
		@Req() request: UserRequest,
		@Body() createUserBikeMaintenanceDto: CreateUserBikeMaintenanceDto,
	): Promise<UserBikeMaintenance> {
		return this.userBikeService.addUserBikeMaintenance(
			createUserBikeMaintenanceDto,
			request,
		);
	}

	/**
	 * Get all user bikes maintenance from user bike
	 * @param userBikeId
	 */
	@UseGuards(IsAuthGuard)
	@Get('userBike/:userBikeId')
	async getAllUserBikeMaintenancesFromUserBike(
		@Param('userBikeId') userBikeId: string,
	): Promise<UserBikeMaintenance[]> {
		return this.userBikeService.getAllUserBikeMaintenancesFromUserBike(
			userBikeId,
		);
	}
}
