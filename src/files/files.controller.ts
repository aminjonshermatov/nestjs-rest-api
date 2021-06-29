import {
  Post,
  HttpCode,
  UseGuards,
  Controller,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { JwtGuard } from "../auth/guards/jwt.guard";
import { FileResponseElementResponse } from "./dto/file-response-element.response";
import { FilesService } from "./files.service";
import { MfileClass } from "./mfile.class";

@Controller('files')
export class FilesController {

  constructor(
    private readonly filesService: FilesService
  ) { }

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Array<FileResponseElementResponse>> {
    const saveArr: Array<MfileClass> = [new MfileClass(file)];
    if (file.mimetype.includes('image')) {
      const buffer = await this.filesService.convertToWebP(file.buffer);
      saveArr.push(new MfileClass({
        originalname: `${file.originalname.split('.')[0]}.webp`,
        buffer
      }));
    }

    return this.filesService.saveFiles(saveArr);
  }
}
