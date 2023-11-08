import { Test, TestingModule } from '@nestjs/testing';
import { UserLocationController } from './user-location.controller';
import { UserLocationService } from './user-location.service';

describe('UserLocationController', () => {
  let controller: UserLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLocationController],
      providers: [UserLocationService],
    }).compile();

    controller = module.get<UserLocationController>(UserLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
