import { IsString } from "class-validator";

export class AuthDto {
  @IsString({ message: 'Логин должен быть строкой' })
  login: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}
