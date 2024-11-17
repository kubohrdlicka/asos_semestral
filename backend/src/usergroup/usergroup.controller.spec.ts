import { Test, TestingModule } from '@nestjs/testing';
import { UsergroupController } from './usergroup.controller';
import { UsergroupService } from './usergroup.service';

describe('UsergroupController', () => {
  let controller: UsergroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsergroupController],
      providers: [UsergroupService],
    }).compile();

    controller = module.get<UsergroupController>(UsergroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
