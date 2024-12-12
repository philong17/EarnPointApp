import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointRulesService } from './point-rules.service';
import { PointRulesController } from './point-rules.controller';
import { PointRule } from './entities/point-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PointRule])],
  controllers: [PointRulesController],
  providers: [PointRulesService],
  exports: [PointRulesService],
})
export class PointRulesModule {}
