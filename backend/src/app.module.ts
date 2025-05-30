/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FolderModule } from './folders/folder.module';
import { FileModule } from './files/file.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),

    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DB_HOST,
      port:parseInt(process.env.DB_PORT||'5432',10),
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME,

      autoLoadEntities:true,
      synchronize:true,
    }),
    UsersModule,
    AuthModule,
    FolderModule,
    FileModule,
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
