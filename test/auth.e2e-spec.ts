import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';

import { disconnect } from "mongoose";

import { AppModule } from "../src/app.module";
import { AuthDto } from "../src/auth/dto/auth.dto";

const loginDto: AuthDto = {
  login: 'test@gmail.com',
  password: 'test'
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
        done();
      })
  });

  it('/auth/login (POST) - fail password',() => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({...loginDto, password: 'test1'})
      .expect(401, {
        statusCode: 401,
        message: "Пароль не совпадает",
        error: "Unauthorized"
      });
  });

  it('/auth/login (POST) - fail', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({...loginDto, login: 'test1@gamil.com'})
      .expect(401, {
        statusCode: 401,
        message: "Пользователь с таким email не найден",
        error: "Unauthorized"
      })
  });

  afterAll(() => {
    disconnect();
  })
})
