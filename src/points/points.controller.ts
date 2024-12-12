import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PointsService } from './points.service';
import { CreatePointDto } from './dto/create-point.dto';
import { Point } from './entities/point.entity';

@ApiTags('points')
@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo giao dịch điểm mới' })
  @ApiResponse({ status: 201, type: Point })
  create(@Body() createPointDto: CreatePointDto) {
    return this.pointsService.create(createPointDto);
  }

  @Get('customer/:id')
  @ApiOperation({ summary: 'Lấy lịch sử điểm của khách hàng' })
  @ApiParam({ name: 'id', description: 'ID khách hàng' })
  @ApiResponse({ status: 200, type: [Point] })
  findByCustomer(@Param('id', ParseIntPipe) customerId: number) {
    return this.pointsService.findByCustomer(customerId);
  }
}
