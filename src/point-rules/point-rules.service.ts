import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { CreatePointRuleDto } from './dto/create-point-rule.dto';
import { UpdatePointRuleDto } from './dto/update-point-rule.dto';
import { PointRule } from './entities/point-rule.entity';

@Injectable()
export class PointRulesService {
  constructor(
    @InjectRepository(PointRule)
    private readonly pointRuleRepository: Repository<PointRule>,
  ) {}

  create(createPointRuleDto: CreatePointRuleDto) {
    const pointRule = this.pointRuleRepository.create(createPointRuleDto);
    return this.pointRuleRepository.save(pointRule);
  }

  findAll() {
    return this.pointRuleRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.pointRuleRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePointRuleDto: UpdatePointRuleDto) {
    const pointRule = await this.pointRuleRepository.preload({
      id: id,
      ...updatePointRuleDto,
    });

    if (!pointRule) {
      throw new NotFoundException('Point rule not found');
    }

    return this.pointRuleRepository.save(pointRule);
  }

  async remove(id: number) {
    const pointRule = await this.findOne(id);
    if (!pointRule) {
      throw new NotFoundException('Point rule not found');
    }
    return this.pointRuleRepository.remove(pointRule);
  }

  // Tìm quy tắc tích điểm phù hợp cho một giao dịch
  async findApplicableRules(amount: number, date: Date = new Date()) {
    return this.pointRuleRepository.find({
      where: [
        {
          // Quy tắc cơ bản
          type: 'BASIC',
          isActive: true,
          spendAmount: LessThanOrEqual(amount),
        },
        {
          // Quy tắc theo thời gian
          type: 'TIME_BASED',
          isActive: true,
          spendAmount: LessThanOrEqual(amount),
          startTime: LessThanOrEqual(date),
          endTime: MoreThanOrEqual(date),
        },
        {
          // Quy tắc đặc biệt
          type: 'SPECIAL',
          isActive: true,
          spendAmount: LessThanOrEqual(amount),
          startTime: LessThanOrEqual(date),
          endTime: MoreThanOrEqual(date),
        },
      ],
      order: {
        pointAmount: 'DESC', // Ưu tiên quy tắc cho nhiều điểm hơn
      },
    });
  }

  // Tính toán điểm cho một giao dịch
  async calculatePoints(amount: number, date: Date = new Date()) {
    const applicableRules = await this.findApplicableRules(amount, date);
    if (applicableRules.length === 0) {
      return 0;
    }

    // Lấy quy tắc có lợi nhất cho khách hàng
    const bestRule = applicableRules[0];
    const multiplier = amount / bestRule.spendAmount;
    return Math.floor(multiplier * bestRule.pointAmount);
  }
}
