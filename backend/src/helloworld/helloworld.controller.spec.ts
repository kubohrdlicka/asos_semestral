import { Test, TestingModule } from '@nestjs/testing';
import { HelloworldController } from './helloworld.controller';
import { HelloworldService } from './helloworld.service';

describe('HelloworldController', () => {
  let controller: HelloworldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelloworldController],
      providers: [HelloworldService],
    }).compile();

    controller = module.get<HelloworldController>(HelloworldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
