import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const winstonLoggerConfig: winston.LoggerOptions = {
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.errors({ stack: true }),
		winston.format.printf(info => {
			const timestamp =
				typeof info.timestamp === 'string' ? info.timestamp : '';
			const level = info.level;
			const message =
				typeof info.message === 'string'
					? info.message
					: JSON.stringify(info.message);
			const stack =
				typeof info.stack === 'string' ? info.stack : undefined;

			return `${timestamp} [${level}] : ${stack || message}`;
		}),
	),
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				nestWinstonModuleUtilities.format.nestLike('WrenchRider', {
					prettyPrint: true,
				}),
			),
		}),
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error',
		}),
		new winston.transports.File({ filename: 'logs/combined.log' }),
	],
};
