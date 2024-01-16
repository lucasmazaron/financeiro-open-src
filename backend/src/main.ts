import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import * as momentTimezone from 'moment-timezone';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { ExceptionsFilter } from '@filters/HttpExceptionFilter';
import { LoggingInterceptor } from './interceptors/LoggingInterceptor';
import { TimeoutInterceptor } from './interceptors/TimeoutInterceptor';
import { JwtAuthGuard } from '@modules/auth/auth.guard';

const logger = new Logger('Server Initialization');
dotenv.config();
process.env.TZ = 'America/Sao_Paulo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get<number>('APP_PORT');

  app.use(
    cors((req, callback) => {
      const corsOptions = {
        origin: configService.get<string>('CORS_ALLOWED_URLS'),
        credentials: true,
        methods: 'GET,PUT,PATCH,POST,DELETE',
      };

      callback(null, corsOptions);
    }),
  );

  app.use(compression());
  app.use(helmet());

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this).tz('America/Sao_Paulo').format();
  };

  await app.listen(PORT, () => {
    logger.log(`Server started in port ${PORT}`);
  });
}
bootstrap();
