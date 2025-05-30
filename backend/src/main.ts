import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

import Redis from 'ioredis';
import { RedisStore } from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  if (!process.env.REDIS_URL) {
    throw new Error('REDIS_URL environment variable is not defined');
    
  }
  const redisClient = new Redis(process.env.REDIS_URL);

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'supersecretkey',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,    
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24, 
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
