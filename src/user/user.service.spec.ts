import { Test, TestingModule } from '@nestjs/testing';
import { User.Service } from './user.service';

describe('User.Service', () => {
  let provider: User.Service;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [User.Service],
    }).compile();
    provider = module.get<User.Service>(User.Service);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
