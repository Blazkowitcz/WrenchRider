import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserBike } from './user-bike.entity';
import { CreateUserBikeDto } from './dtos/create-user-bike.dto';
import { EditUserBikeDto } from './dtos/edit-user-bike.dto';

@Injectable()
export class UserBikeService {
	constructor(
		@InjectRepository(UserBike)
		private readonly userBikeRepository: Repository<UserBike>,
	) {}

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
	 * @return {UserBike[]}
	 */
	async getAllBikesFromUser(userId: string): Promise<UserBike[]> {
		return await this.userBikeRepository.find({
			where: { user: { id: userId } },
			relations: ['bike', 'bike.brand'],
		});
	}

	async getUserBike(
		userId: string,
		userBikeId: string,
	): Promise<UserBike | null> {
		return await this.userBikeRepository.findOne({
			where: { id: userBikeId, user: { id: userId } },
		});
	}

	/**
	 *
	 * @param userBike {UserBike}
	 * @param dto {EditUserBikeDto}
	 * @return {UserBike}
	 */
	async editUserBike(
		userBike: UserBike,
		dto: EditUserBikeDto,
	): Promise<UserBike> {
		Object.assign(userBike, dto);
		return this.userBikeRepository.save(userBike);
	}

	/**
	 *
	 * @param userBike {UserBike}
	 * @return {boolean}
	 */
	async removeUserBike(userBike: UserBike): Promise<boolean> {
		await this.userBikeRepository.remove(userBike);
		return true;
	}
}
