// test/test-utils.ts
import { TestingModule, Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

export async function createTestingModuleWithMocks(
  providers: any[],
): Promise<TestingModule> {
  const mockUsersRepository = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  const module = await Test.createTestingModule({
    providers: [
      ...providers, // Inject your custom service or dependencies
      {
        provide: 'USERS_REPOSITORY',
        useValue: mockUsersRepository,
      },
      {
        provide: JwtService,
        useValue: mockJwtService,
      },
    ],
  }).compile();

  return module;
}
