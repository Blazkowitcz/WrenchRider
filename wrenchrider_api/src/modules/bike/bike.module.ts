import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from './bike.entity';
import { BikeService } from './bike.service';
import { BikeController } from './bike.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([Bike]), AuthModule],
	providers: [BikeService],
	controllers: [BikeController],
	exports: [BikeService],
})
export class BikeModule {
}
