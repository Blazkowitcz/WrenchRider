import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserBike } from './user-bike.entity';
import { CreateUserBikeDto } from './dtos/create-user-bike.dto';

@Injectable()
export class UserBikeService {
	constructor(
		@InjectRepository(UserBike)
		private readonly userBikeRepository: Repository<UserBike>,
	) {
	}

	/**
	 * Add new user bike
	 * @param dto {CreateUserBikeDto}
	 */
	async addUserBike(dto: CreateUserBikeDto): Promise<UserBike> {
		const userBike = this.userBikeRepository.create(dto);
		return this.userBikeRepository.save(userBike);
	}

	/**
	 * Get all bikes from user
	 * @param userId {String}
	 */
	async getAllBikesFromUser(userId: string): Promise<UserBike[]> {
		return await this.userBikeRepository.find({
			where: { user: { id: userId } },
			relations: ['bike', 'bike.brand'],
		});
	}
}
