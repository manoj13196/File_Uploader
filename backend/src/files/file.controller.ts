import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Req,
  UseGuards,
  Get,
  Res,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response, Request } from 'express';
import { User } from 'src/users/user.entity';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';


@Controller('folders/:folderId/files')
@UseGuards(AuthenticatedGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage()
    //   diskStorage({
    //     destination: './uploads',
    //     filename: (req, file, cb) => {
    //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //       const ext = extname(file.originalname);
    //       cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    //     },
    //   }),
    }),
  )
  async uploadFile(
    @Param('folderId') folderId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return await this.fileService.uploadFile(Number(folderId), file, user);
  }


 @Get()
  async getFilesInFolder(@Param('folderId') id: string, @Req() req: Request) {
    const user = req.user as User;
    return await this.fileService.getFilesInFolder(Number(id), user);
  }


  @Get(':id/download')
  async downloadFile(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const file = await this.fileService.findFileById(Number(id), user);

    
//     const filePath = path.resolve('uploads', file.storedFileName);
// res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
// return res.sendFile(filePath);

return res.redirect(file.cloudinaryUrl)

  }


  
@Delete(':id')
async deleteFile(
  @Param('folderId') folderId: string,
  @Param('id') id: string,
  @Req() req: Request,
) {
  const user = req.user as User;
  return await this.fileService.deleteFile(Number(folderId), Number(id), user);
}
  
}
