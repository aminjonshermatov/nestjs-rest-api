export class MfileClass {
  originalname: string;
  buffer: Buffer;

  constructor(
    file: Express.Multer.File | MfileClass
  ) {
    this.buffer = file.buffer;
    this.originalname = file.originalname;
  }
}
