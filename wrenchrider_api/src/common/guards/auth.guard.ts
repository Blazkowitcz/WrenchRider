import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../modules/user/user.entity';
import { Request } from 'express';

interface JwtPayload {
	id: string;
	isAdmin: boolean;
}

/**
 * Check is User is connected
 */
@Injectable()
export class IsAuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>();
		const token = request.headers.authorization;

		if (!token) {
			throw new UnauthorizedException(
				'Missing or invalid Authorization header',
			);
		}

		try {
			request['user'] = this.jwtService.verify<JwtPayload>(token);
			return true;
		} catch (error) {
			console.error(error);
			throw new UnauthorizedException('Invalid or expired token');
		}
	}
}

/**
 * Check if User is administrator
 */
@Injectable()
export class IsAdminGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>();
		const token = request.headers.authorization;

		if (!token) {
			throw new UnauthorizedException(
				'Missing or invalid Authorization header',
			);
		}

		try {
			const currentUser: User = this.jwtService.decode(token);
			return currentUser.isAdmin;
		} catch (err) {
			console.error(err);
			throw new UnauthorizedException('Invalid or expired token');
		}
	}
}
