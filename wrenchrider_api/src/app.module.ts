import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { BrandModule } from './modules/brand/brand.module';
import { BikeModule } from './modules/bike/bike.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserBikeModule } from './modules/user-bike/user-bike.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from './common/logger/winston.module';

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
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_DATABASE'),
				synchronize: true,
				autoSchemaSync: true,
				entities: [`${__dirname}/modules/**/**.entity{.ts,.js}`],
			}),
		}),
		LoggerModule,
		UserModule,
		AuthModule,
		BrandModule,
		BikeModule,
		UserBikeModule,
		MaintenanceModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
