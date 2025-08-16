import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBikeMaintenance } from './user-bike-maintenance.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([UserBikeMaintenance]), AuthModule],
	providers: [],
	controllers: [],
})
export class UserBikeMaintenanceModule {}
