import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
  @IsString({ message: 'Поле "name" должно быть строкой' })
  name: string;

  @IsString({ message: 'Поле "title" должно быть строкой' })
  title: string;

  @IsString({ message: 'Поле "description" должно быть строкой' })
  description: string;

  @Min(1, { message: 'Рейтинг не может быть не менее 1' })
  @Max(5, { message: 'Рейтинг не может быть не менее 5' })
  @IsNumber({}, { message: 'Поле "rating" должен быть числом' })
  rating: number;

  @IsString({ message: 'Поле "productId" должно быть строкой' })
  productId: string;
}
