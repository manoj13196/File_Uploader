 import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
 const isProd = process.env.NODE_ENV === 'production';
  app.enableCors({
    origin:process.env.CLIENT_URL,
    credentials:true,
  });


  app.use(
    session({
      secret:'supersecretkey',
      resave:false,
      saveUninitialized:false,
      cookie: {
        httpOnly: true,
        secure: isProd,        
        sameSite: isProd ? 'none' : 'lax',
        maxAge:1000*60*60*24,
      },

    })
  );

  app.use(passport.initialize());
  app.use(passport.session());


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
