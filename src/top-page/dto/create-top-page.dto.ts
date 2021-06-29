import {
  IsEnum,
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { TopLevelCategory } from "../top-page.model";

export class HHDataDto {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

export class TopPageAdvantagesDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HHDataDto)
  hh?: HHDataDto;

  @IsArray()
  @Type(() => TopPageAdvantagesDto)
  @ValidateNested()
  advantages: Array<TopPageAdvantagesDto>;

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: Array<string>;
}
