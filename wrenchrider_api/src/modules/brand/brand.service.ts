import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dtos/create-brand.dto';

@Injectable()
export class BrandService {
	constructor(
		@InjectRepository(Brand)
		private readonly brandRepository: Repository<Brand>,
	) {
	}

	/**
	 * Add new brand
	 * @param dto {CreateBrandDto}
	 * @return {Brand}
	 */
	async addBrand(dto: CreateBrandDto): Promise<Brand> {
		const brand = this.brandRepository.create(dto);
		return this.brandRepository.save(brand);
	}

	/**
	 * Get all brands
	 * @return {Brand[]}
	 */
	async getAllBrands(): Promise<Brand[]> {
		return this.brandRepository.find();
	}

	/**
	 * Get brand by its name
	 * @param name
	 * @returns {Brand|null}
	 */
	async getBrandByName(name: string): Promise<Brand | null> {
		return this.brandRepository.findOne({ where: { name } });
	}
}
