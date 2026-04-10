import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { RolesGuard } from './common/guards/roles.guard';
import { Reflector } from '@nestjs/core';

import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const prisma = app.get(PrismaService);

  // const users = await prisma.user.findMany();
  // console.log(users);

  // app.use((req, res, next) => {
  //   req.user = {
  //     id: 1,
  //     role: 'ADMIN', // change to USER to test
  //   };
  //   next();
  // });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra fields
      forbidNonWhitelisted: true,   // throw error if extra fields are present
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());


  await app.listen(port || 3000);
}
bootstrap();