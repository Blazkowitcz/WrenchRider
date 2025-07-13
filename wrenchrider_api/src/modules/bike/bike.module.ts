import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from './bike.entity';
import { BikeService } from './bike.service';

@Module({
	imports: [TypeOrmModule.forFeature([Bike])],
	providers: [BikeService],
})
export class BikeModule {}
