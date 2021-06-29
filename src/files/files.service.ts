import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from "sharp";

import { FileResponseElementResponse } from "./dto/file-response-element.response";
import { MfileClass } from "./mfile.class";

@Injectable()
export class FilesService {
  async saveFiles(files: Array<MfileClass>): Promise<Array<FileResponseElementResponse>> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    await ensureDir(uploadFolder);
    const res: Array<FileResponseElementResponse> = [];

    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      res.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname });
    }

    return res;
  }

  async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file)
      .webp()
      .toBuffer();
  }
}
