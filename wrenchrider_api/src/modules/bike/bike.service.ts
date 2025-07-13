import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bike } from './bike.entity';
import { CreateBikeDto } from './dtos/create-bike.dto';

@Injectable()
export class BikeService {
	constructor(
		@InjectRepository(Bike)
		private readonly bikeRepository: Repository<Bike>,
	) {}

	/**
	 * Add new bike
	 * @param dto {CreateBikeDto}
	 * @return {Bike}
	 */
	async addBike(dto: CreateBikeDto): Promise<Bike> {
		const bike: Bike = this.bikeRepository.create(dto);
		return this.bikeRepository.save(bike);
	}

	/**
	 * Get all bikes from a brand
	 * @param brandId {String}
	 * @return {Bike[]}
	 */
	async getAllBikesFromBrand(brandId: string): Promise<Bike[]> {
		return await this.bikeRepository.find({
			where: { brand: { id: brandId } },
		});
	}
}
