import {
	Controller,
	Post,
	Body,
	HttpException,
	HttpStatus,
	Get,
	Req,
	UseGuards,
} from '@nestjs/common';
import { UserBikeService } from './user-bike.service';
import { CreateUserBikeDto } from './dtos/create-user-bike.dto';
import { UserBike } from './user-bike.entity';
import { UserRequest } from '../user/user.entity';
import { IsAuthGuard } from '../../common/guards/auth.guard';

@Controller('user-bikes')
export class UserBikeController {
	constructor(private readonly userBikeService: UserBikeService) {
	}

	@UseGuards(IsAuthGuard)
	@Post()
	async addUserBike(@Req() request: UserRequest, @Body() dto: CreateUserBikeDto): Promise<UserBike> {
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

	@UseGuards(IsAuthGuard)
	@Get()
	async getAllBikesFromUser(
		@Req() request: UserRequest,
	): Promise<UserBike[]> {
		return this.userBikeService.getAllBikesFromUser(request.user.id);
	}
}
