import {
	Controller,
	Post,
	Put,
	Body,
	HttpException,
	HttpStatus,
	Get,
	Req,
	UseGuards,
	Param,
	Delete,
	Inject,
} from '@nestjs/common';
import { UserBikeService } from './user-bike.service';
import { CreateUserBikeDto } from './dtos/create-user-bike.dto';
import { EditUserBikeDto } from './dtos/edit-user-bike.dto';
import { UserBike } from './user-bike.entity';
import { UserRequest } from '../user/user.entity';
import { IsAuthGuard } from '../../common/guards/auth.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('user-bikes')
export class UserBikeController {
	constructor(
		private readonly userBikeService: UserBikeService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: Logger,
	) {}

	/**
	 * Add user bike
	 * @param request {UserRequest}
	 * @param dto {CreateUserBikeDto}
	 * @returns {UserBike}
	 */
	@UseGuards(IsAuthGuard)
	@Post()
	async addUserBike(
		@Req() request: UserRequest,
		@Body() dto: CreateUserBikeDto,
	): Promise<UserBike> {
		try {
			return this.userBikeService.addUserBike({
				user: request.user,
				bike: dto.bike,
				licence: dto.licence,
				mileage: dto.mileage,
			});
		} catch (error) {
			this.logger.error(error);
			throw new HttpException(
				'Server Error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	/**
	 * Get all bikes from user
	 * @param request {UserRequest}
	 * @returns {UserBike[]}
	 */
	@UseGuards(IsAuthGuard)
	@Get()
	async getAllBikesFromUser(
		@Req() request: UserRequest,
	): Promise<UserBike[]> {
		try {
			return this.userBikeService.getAllBikesFromUser(request.user.id);
		} catch (error) {
			this.logger.error(error);
			throw new HttpException(
				'Failed to create user',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	/**
	 * Edit user bike
	 * @param userBikeId {String}
	 * @param request {UserRequest}
	 * @param dto {EditUserBikeDto}
	 * @returns {Boolean}
	 */
	@UseGuards(IsAuthGuard)
	@Put(':userBikeId')
	async editUserBike(
		@Param('userBikeId') userBikeId: string,
		@Req() request: UserRequest,
		@Body() dto: EditUserBikeDto,
	): Promise<boolean> {
		try {
			const userBike = await this.userBikeService.getUserBike(
				request.user.id,
				userBikeId,
			);
			if (userBike) {
				await this.userBikeService.editUserBike(userBike, dto);
				return true;
			}
			return false;
		} catch (error) {
			this.logger.error(error);
			throw new HttpException(
				'Failed to create user',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	/**
	 * Remove user bike
	 * @param userBikeId
	 * @param request
	 * @returns {Boolean}
	 */
	@UseGuards(IsAuthGuard)
	@Delete(':userBikeId')
	async removeUserBike(
		@Param('userBikeId') userBikeId: string,
		@Req() request: UserRequest,
	): Promise<boolean> {
		try {
			const userBike = await this.userBikeService.getUserBike(
				request.user.id,
				userBikeId,
			);
			if (userBike) {
				await this.userBikeService.removeUserBike(userBike);
				return true;
			}
			return false;
		} catch (error) {
			this.logger.error(error);
			throw new HttpException(
				'Failed to create user',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
