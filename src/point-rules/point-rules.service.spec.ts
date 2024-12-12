import { Test, TestingModule } from '@nestjs/testing';
import { PointRulesService } from './point-rules.service';

describe('PointRulesService', () => {
  let service: PointRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointRulesService],
    }).compile();

    service = module.get<PointRulesService>(PointRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
