import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from './maintenance.entity';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([Maintenance]), AuthModule],
	providers: [MaintenanceService],
	controllers: [MaintenanceController],
	exports: [],
})
export class MaintenanceModule {}
