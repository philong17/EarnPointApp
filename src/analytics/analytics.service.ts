import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Analytics } from './entities/analytics.entity';
import { Point } from '../points/entities/point.entity';
import { Customer } from '../customers/entities/customer.entity';
import { PointRule } from '../point-rules/entities/point-rule.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private readonly analyticsRepository: Repository<Analytics>,
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(PointRule)
    private readonly pointRuleRepository: Repository<PointRule>,
  ) {}

  async generateDailyAnalytics(date: Date = new Date()) {
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));
    return this.generateAnalytics('DAILY', startDate, endDate);
  }

  async generateWeeklyAnalytics(date: Date = new Date()) {
    const startDate = new Date(date.setDate(date.getDate() - date.getDay()));
    const endDate = new Date(date.setDate(date.getDate() + 6));
    return this.generateAnalytics('WEEKLY', startDate, endDate);
  }

  async generateMonthlyAnalytics(date: Date = new Date()) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return this.generateAnalytics('MONTHLY', startDate, endDate);
  }

  private async generateAnalytics(
    type: string,
    startDate: Date,
    endDate: Date,
  ) {
    // Lấy tất cả giao dịch điểm trong khoảng thời gian
    const points = await this.pointRepository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      relations: ['customer'],
    });

    // Tính toán các chỉ số
    const earnedPoints = points
      .filter((p) => p.type === 'EARN')
      .reduce((sum, p) => sum + p.points, 0);

    const redeemedPoints = points
      .filter((p) => p.type === 'REDEEM')
      .reduce((sum, p) => sum + p.points, 0);

    const uniqueCustomers = new Set(points.map((p) => p.customerId));
    const activeCustomers = uniqueCustomers.size;

    // Tính điểm trung bình mỗi khách hàng
    const averagePointsPerCustomer =
      activeCustomers > 0 ? earnedPoints / activeCustomers : 0;

    // Tìm top khách hàng tích điểm nhiều nhất
    const customerPoints = new Map<number, number>();
    points
      .filter((p) => p.type === 'EARN')
      .forEach((p) => {
        const current = customerPoints.get(p.customerId) || 0;
        customerPoints.set(p.customerId, current + p.points);
      });

    const topEarners = Array.from(customerPoints.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([customerId, points]) => ({ customerId, points }));

    // Tạo analytics record mới
    const analytics = this.analyticsRepository.create({
      type,
      startDate,
      endDate,
      metrics: {
        totalPoints: earnedPoints - redeemedPoints,
        earnedPoints,
        redeemedPoints,
        activeCustomers,
        averagePointsPerCustomer,
        topEarners,
        popularRules: [], // Sẽ implement sau
      },
    });

    return this.analyticsRepository.save(analytics);
  }

  async getDashboardStats() {
    // Lấy thống kê tổng quan
    const totalCustomers = await this.customerRepository.count();
    const totalPoints = await this.pointRepository
      .createQueryBuilder('point')
      .select(
        'SUM(CASE WHEN type = :earn THEN points ELSE -points END)',
        'total',
      )
      .setParameter('earn', 'EARN')
      .getRawOne();

    const today = new Date();
    const thisMonth = await this.generateMonthlyAnalytics(today);
    const lastMonth = await this.generateMonthlyAnalytics(
      new Date(today.setMonth(today.getMonth() - 1)),
    );

    return {
      totalCustomers,
      totalPoints: totalPoints.total || 0,
      thisMonth,
      lastMonth,
    };
  }
}
