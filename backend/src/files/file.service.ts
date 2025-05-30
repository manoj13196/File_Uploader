import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { Folder } from 'src/folders/folder.entity';
import { User } from 'src/users/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,

    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,

    private cloudinaryService: CloudinaryService,
  ) {}

  async uploadFile(folderId: number, file: Express.Multer.File, user: User): Promise<File> {
    const folder = await this.folderRepository.findOne({
      where: { id: folderId, user: { id: user.id } },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found or not owned by user');
    }

    const uploadResult = await this.cloudinaryService.uploadFile(file.buffer, file.originalname, file.mimetype);

    const savedFile = this.fileRepository.create({
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      cloudinaryUrl: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,  // store publicId for deletion
      folder,
    });

    return await this.fileRepository.save(savedFile);
  }

  async getFilesInFolder(folderId: number, user: User): Promise<File[]> {
    return this.fileRepository.find({
      where: {
        folder: {
          id: folderId,
          user: { id: user.id },
        },
      },
      relations: ['folder'],
      order: { updatedAt: 'DESC' },
    });
  }

  async findFileById(id: number, user: User): Promise<File> {
    const file = await this.fileRepository.findOne({
      where: {
        id,
        folder: {
          user: { id: user.id },
        },
      },
      relations: ['folder'],
    });

    if (!file) throw new NotFoundException('File not found or access denied');
    return file;
  }

  async deleteFile(folderId: number, fileId: number, user: User): Promise<{ message: string }> {
    const file = await this.fileRepository.findOne({
      where: {
        id: fileId,
        folder: { id: folderId, user: { id: user.id } },
      },
      relations: ['folder'],
    });

    if (!file) {
      throw new NotFoundException('File not found or access denied');
    }

    try {
      await this.cloudinaryService.deleteFile(file.cloudinaryPublicId);
      await this.fileRepository.remove(file);
      return { message: 'File deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting file: ' + error.message);
    }
  }
}
