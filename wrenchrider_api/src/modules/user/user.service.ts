import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {
	}

	/**
	 * Add new user
	 * @param dto {CreateUserDto}
	 * @returns {User}
	 */
	async addUser(dto: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(dto);
		return this.userRepository.save(user);
	}

	/**
	 * Find user by its email
	 * @param email {String}
	 * @returns {User|null}
	 */
	async getUserByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOne({ where: { email } });
	}
}
