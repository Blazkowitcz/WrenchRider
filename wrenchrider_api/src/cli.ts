import { NestFactory } from '@nestjs/core';
import { CliModule } from './cli/cli.module';
import { GenerateBrandsCommand } from './cli/generate-brands.command';

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(CliModule);
	const command = app.get(GenerateBrandsCommand);
	await command.run();
	await app.close();
}

bootstrap().catch(err => {
	console.error('CLI Error:', err);
	process.exit(1);
});
