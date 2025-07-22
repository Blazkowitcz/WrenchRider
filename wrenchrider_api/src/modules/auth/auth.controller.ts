import {
	Controller,
	Post,
	Body,
	HttpException,
	HttpStatus,
	Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { hash, compare } from 'bcrypt';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: Logger,
	) {}

	/**
	 * Sign up new user
	 * @param user { CreateUserDto }
	 */
	@Post('signup')
	async signup(
		@Body() user: CreateUserDto,
	): Promise<boolean | HttpException> {
		try {
			const userExisting = await this.userService.getUserByEmail(
				user.email,
			);
			if (!userExisting) {
				const hashPass: string = await hash(user.password, 10);
				const data = { ...user, password: hashPass, isAdmin: false };
				await this.userService.addUser(data);
				return true;
			}
			return new HttpException(
				'User with this email already exist',
				HttpStatus.NOT_ACCEPTABLE,
			);
		} catch (error) {
			this.logger.error(error);
			throw new HttpException(
				'Failed to create user',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	/**
	 * Sign in
	 * @param user
	 */
	@Post('signin')
	async signin(@Body() user: CreateUserDto): Promise<string> {
		try {
			const currentUser = await this.userService.getUserByEmail(
				user.email,
			);
			if (currentUser) {
				const validation = await compare(
					user.password,
					currentUser.password,
				);
				if (validation) {
					return this.jwtService.sign({
						id: currentUser.id,
						isAdmin: currentUser.isAdmin,
					});
				}
				throw new HttpException(
					'Wrong password',
					HttpStatus.UNAUTHORIZED,
				);
			} else {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}
		} catch (error) {
			this.logger.error(error);
			throw new HttpException(
				'Internal server error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
