import { Test, TestingModule } from '@nestjs/testing';
import { Request } from './request';

describe('Request', () => {
  let provider: Request;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Request],
    }).compile();
    provider = module.get<Request>(Request);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
