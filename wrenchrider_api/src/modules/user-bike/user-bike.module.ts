import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBike } from './user-bike.entity';
import { UserBikeService } from './user-bike.service';
import { UserBikeController } from './user-bike.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([UserBike]), AuthModule],
	providers: [UserBikeService],
	controllers: [UserBikeController],
})
export class UserBikeModule {}
