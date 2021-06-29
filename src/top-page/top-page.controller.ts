import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  UseGuards,
  Controller,
  ValidationPipe,
  NotFoundException
} from "@nestjs/common";

import { FindTopPageDto } from "./dto/find-top-page.dto";
import { TopPageService } from "./top-page.service";
import { CreateTopPageDto } from "./dto/create-top-page.dto";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { NOT_FOUND_TOP_PAGE_ERROR } from "./top-page.constants";
import { JwtGuard } from "../auth/guards/jwt.guard";


@Controller('top-page')
export class TopPageController {

  constructor(
    private readonly topPageService: TopPageService
  ) { }

  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findById(id);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return page;
  }

  @UseGuards(JwtGuard)
  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = this.topPageService.findByAlias(alias);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return page;
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedPage = await this.topPageService.deleteById(id);

    if (!deletedPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateTopPageDto
  ) {
    const updatedPage = this.topPageService.updateById(id, dto);

    if (!updatedPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return updatedPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }
}
