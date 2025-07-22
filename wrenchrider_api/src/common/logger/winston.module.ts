import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './winston.logger';

@Global()
@Module({
	imports: [WinstonModule.forRoot(winstonLoggerConfig)],
	exports: [WinstonModule],
})
export class LoggerModule {}
