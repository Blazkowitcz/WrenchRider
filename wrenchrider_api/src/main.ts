import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLoggerConfig } from './common/logger/winston.logger';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: WinstonModule.createLogger(winstonLoggerConfig),
	});
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(err => {
	const fallbackLogger = WinstonModule.createLogger(winstonLoggerConfig);
	fallbackLogger.error('NestJS application failed to start', err);
	process.exit(1);
});
