import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Folder } from "./folder.entity";
import { Repository } from "typeorm";
import { CreateFolderDto } from "./dto/create_folder.dto";
import { User } from "src/users/user.entity";

@Injectable()
export class FolderService{
    constructor(
        @InjectRepository(Folder)
        private folderRepository:Repository<Folder>,
    ){}


    async createFolder(user: User, createFolderDto:CreateFolderDto):Promise<Folder>{
        const folder = this.folderRepository.create({
            name:createFolderDto.name,
            user,
        });

        return await this.folderRepository.save(folder);
    }

    async findAllFolders(user: User): Promise<Folder[]> {
  return await this.folderRepository.find({
    where: { user: { id: user.id } },
    order: { createdAt: 'DESC' },
  });
}

async findOneFolder(id: number, user: User): Promise<Folder | null> {
  return await this.folderRepository.findOne({
    where: { id, user: { id: user.id } },
  });
}


async updateFolder(id: number, user: User, newName: string): Promise<Folder | null> {
  const folder = await this.findOneFolder(id, user);
  if (!folder) return null;

  folder.name = newName;
  return await this.folderRepository.save(folder);
}


async deleteFolder(id: number, user: User): Promise<boolean> {
  const folder = await this.findOneFolder(id, user);
  if (!folder) return false;

  await this.folderRepository.remove(folder);
  return true;
}


}