import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { FolderService } from "./folder.service";
import { CreateFolderDto } from "./dto/create_folder.dto";
import { User } from "src/users/user.entity";
import { Request } from 'express';
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";

@Controller('folders')
@UseGuards(AuthenticatedGuard)
export class FolderController{
    constructor(private readonly folderService:FolderService){}

    @Post()
    async createFolder(
        @Body() createFolderDto:CreateFolderDto,
        @Req() req:Request,
    ){
        const user=req.user as User;
        return await this.folderService.createFolder(user, createFolderDto);
    }

      @Get()
  async findAllFolders(@Req() req: Request) {
    const user = req.user as User;
    return await this.folderService.findAllFolders(user);
  }

    @Get(':id')
  async findOneFolder(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return await this.folderService.findOneFolder(Number(id), user);
  }


    @Patch(':id')
  async updateFolder(
    @Param('id') id: string,
    @Body('name') name: string,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return await this.folderService.updateFolder(Number(id), user, name);
  }

    @Delete(':id')
  async deleteFolder(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return await this.folderService.deleteFolder(Number(id), user);
  }
}
