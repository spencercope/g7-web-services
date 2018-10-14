import { Test, TestingModule } from '@nestjs/testing';
import { RequestController } from './request.controller';

describe('Request Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RequestController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: RequestController = module.get<RequestController>(RequestController);
    expect(controller).toBeDefined();
  });
});
