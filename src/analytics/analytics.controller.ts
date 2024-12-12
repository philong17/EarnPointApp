import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('daily')
  @ApiOperation({ summary: 'Thống kê theo ngày' })
  @ApiQuery({ name: 'date', required: false, description: 'Ngày thống kê' })
  @ApiResponse({ status: 200, description: 'Dữ liệu thống kê theo ngày' })
  generateDaily(@Query('date') date?: string) {
    return this.analyticsService.generateDailyAnalytics(
      date ? new Date(date) : undefined,
    );
  }

  @Get('weekly')
  @ApiOperation({ summary: 'Thống kê theo tuần' })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Ngày trong tuần cần thống kê',
  })
  @ApiResponse({ status: 200, description: 'Dữ liệu thống kê theo tuần' })
  generateWeekly(@Query('date') date?: string) {
    return this.analyticsService.generateWeeklyAnalytics(
      date ? new Date(date) : undefined,
    );
  }

  @Get('monthly')
  @ApiOperation({ summary: 'Thống kê theo tháng' })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Ngày trong tháng cần thống kê',
  })
  @ApiResponse({ status: 200, description: 'Dữ liệu thống kê theo tháng' })
  generateMonthly(@Query('date') date?: string) {
    return this.analyticsService.generateMonthlyAnalytics(
      date ? new Date(date) : undefined,
    );
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Thống kê tổng quan' })
  @ApiResponse({ status: 200, description: 'Dữ liệu thống kê tổng quan' })
  getDashboardStats() {
    return this.analyticsService.getDashboardStats();
  }
}
