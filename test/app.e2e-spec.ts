import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('The Boroughs Test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('payments', () => {
    it('should return payment dates for next 12 months from given dane', () =>
      request(app.getHttpServer())
        .get('/payments')
        .query({ date: '2022-03-01' })
        .expect(StatusCodes.OK)
        .expect((res) => {
          expect(res.body).toEqual([
            '2022-03-31',
            '2022-04-29',
            '2022-05-31',
            '2022-06-30',
            '2022-07-29',
            '2022-08-31',
            '2022-09-30',
            '2022-10-31',
            '2022-11-30',
            '2022-12-30',
            '2023-01-31',
            '2023-02-28',
          ]);
        }));
  });
});
