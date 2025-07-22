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
} from '@nestjs/common';
import { UserBikeService } from './user-bike.service';
import { CreateUserBikeDto } from './dtos/create-user-bike.dto';
import { EditUserBikeDto } from './dtos/edit-user-bike.dto';
import { UserBike } from './user-bike.entity';
import { UserRequest } from '../user/user.entity';
import { IsAuthGuard } from '../../common/guards/auth.guard';

@Controller('user-bikes')
export class UserBikeController {
	constructor(private readonly userBikeService: UserBikeService) {
	}

	/**
	 * Add user bike
	 * @param request {UserRequest}
	 * @param dto {CreateUserBikeDto}
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
			console.log(error);
			throw new HttpException(
				'Server Error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	/**
	 * Get all bikes from user
	 * @param request {UserRequest}
	 */
	@UseGuards(IsAuthGuard)
	@Get()
	async getAllBikesFromUser(
		@Req() request: UserRequest,
	): Promise<UserBike[]> {
		return this.userBikeService.getAllBikesFromUser(request.user.id);
	}

	/**
	 * Edit user bike
	 * @param userBikeId {String}
	 * @param request {UserRequest}
	 * @param dto {EditUserBikeDto}
	 */
	@UseGuards(IsAuthGuard)
	@Put(':userBikeId')
	async editUserBike(
		@Param('userBikeId') userBikeId: string,
		@Req() request: UserRequest,
		@Body() dto: EditUserBikeDto,
	): Promise<boolean> {
		const userBike = await this.userBikeService.getUserBike(
			request.user.id,
			userBikeId,
		);
		if (userBike) {
			await this.userBikeService.editUserBike(userBike, dto);
			return true;
		}
		return false;
	}

	/**
	 *
	 * @param userBikeId
	 * @param request
	 */
	@UseGuards(IsAuthGuard)
	@Delete(':userBikeId')
	async removeUserBike(
		@Param('userBikeId') userBikeId: string,
		@Req() request: UserRequest,
	): Promise<boolean> {
		const userBike = await this.userBikeService.getUserBike(
			request.user.id,
			userBikeId,
		);
		if (userBike) {
			await this.userBikeService.removeUserBike(userBike);
			return true;
		}
		return false;
	}
}
