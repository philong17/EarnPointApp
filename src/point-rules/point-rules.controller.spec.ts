import { Test, TestingModule } from '@nestjs/testing';
import { PointRulesController } from './point-rules.controller';
import { PointRulesService } from './point-rules.service';

describe('PointRulesController', () => {
  let controller: PointRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointRulesController],
      providers: [PointRulesService],
    }).compile();

    controller = module.get<PointRulesController>(PointRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
