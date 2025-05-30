import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { Folder } from 'src/folders/folder.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';


@Module({
  imports: [TypeOrmModule.forFeature([File, Folder]),
CloudinaryModule],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
