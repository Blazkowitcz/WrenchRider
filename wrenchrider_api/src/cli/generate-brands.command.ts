import { Command, CommandRunner } from 'nest-commander';
import { BrandService } from '../modules/brand/brand.service';
import { BikeService } from '../modules/bike/bike.service';
import data from '../../data/data.json';

@Command({
	name: 'generate-brands',
	description: 'Populate the brand table with initial brands',
})
export class GenerateBrandsCommand extends CommandRunner {
	constructor(
		private readonly brandService: BrandService,
		private readonly bikeService: BikeService,
	) {
		super();
	}

	async run(): Promise<void> {
		console.log('🚀 Starting brand generation...');

		for (const brand of data) {
			if (!brand.name || !brand.color) {
				console.warn(
					`⚠️  Brand is missing name or color: ${JSON.stringify(brand)}`,
				);
				continue;
			}

			const exist = await this.brandService.getBrandByName(brand.name);
			if (exist) {
				console.log(`ℹ️ Brand already exists: ${brand.name}`);
				continue;
			}

			const newBrand = await this.brandService.addBrand({
				name: brand.name,
				color: brand.color,
			});

			console.log(`✅ Added brand: ${brand.name}`);

			if (Array.isArray(brand.bikes)) {
				for (const bike of brand.bikes) {
					if (
						!bike.name ||
						typeof bike.power !== 'number' ||
						typeof bike.year !== 'number'
					) {
						console.warn(
							`⚠️  Bike is missing fields: ${JSON.stringify(bike)}`,
						);
						continue;
					}

					await this.bikeService.addBike({
						name: bike.name,
						power: bike.power,
						year: bike.year,
						brand: { id: newBrand.id },
					});

					console.log(
						`   🛵 Added bike: ${bike.name} (${bike.year})`,
					);
				}
			}
		}

		console.log('✅ Brand generation completed.');
	}
}
