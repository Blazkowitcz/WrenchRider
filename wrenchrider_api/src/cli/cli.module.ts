import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandModule } from '../modules/brand/brand.module';
import { BikeModule } from '../modules/bike/bike.module';
import { GenerateBrandsCommand } from './generate-brands.command';
import { Brand } from '../modules/brand/brand.entity';
import { Bike } from '../modules/bike/bike.entity';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				username: configService.get<string>('DB_USERNAME'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_DATABASE'),
				entities: [Brand, Bike],
				synchronize: true,
			}),
		}),
		BrandModule,
		BikeModule,
	],
	providers: [GenerateBrandsCommand],
})
export class CliModule {
}
