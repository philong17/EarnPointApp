import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ParseFloatPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PointRulesService } from './point-rules.service';
import { CreatePointRuleDto } from './dto/create-point-rule.dto';
import { UpdatePointRuleDto } from './dto/update-point-rule.dto';
import { PointRule } from './entities/point-rule.entity';

@ApiTags('point-rules')
@Controller('point-rules')
export class PointRulesController {
  constructor(private readonly pointRulesService: PointRulesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo quy tắc tích điểm mới' })
  @ApiResponse({ status: 201, type: PointRule })
  create(@Body() createPointRuleDto: CreatePointRuleDto) {
    return this.pointRulesService.create(createPointRuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách quy tắc tích điểm' })
  @ApiResponse({ status: 200, type: [PointRule] })
  findAll() {
    return this.pointRulesService.findAll();
  }

  @Get('calculate')
  @ApiOperation({ summary: 'Tính điểm cho một giao dịch' })
  @ApiQuery({ name: 'amount', description: 'Số tiền giao dịch', type: Number })
  @ApiQuery({ name: 'date', required: false, description: 'Ngày giao dịch' })
  @ApiResponse({ status: 200, description: 'Số điểm được tích' })
  calculatePoints(
    @Query('amount', ParseFloatPipe) amount: number,
    @Query('date') date?: string,
  ) {
    return this.pointRulesService.calculatePoints(
      amount,
      date ? new Date(date) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin một quy tắc tích điểm' })
  @ApiParam({ name: 'id', description: 'ID quy tắc' })
  @ApiResponse({ status: 200, type: PointRule })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pointRulesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật quy tắc tích điểm' })
  @ApiParam({ name: 'id', description: 'ID quy tắc' })
  @ApiResponse({ status: 200, type: PointRule })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePointRuleDto: UpdatePointRuleDto,
  ) {
    return this.pointRulesService.update(id, updatePointRuleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa quy tắc tích điểm' })
  @ApiParam({ name: 'id', description: 'ID quy tắc' })
  @ApiResponse({ status: 200, description: 'Quy tắc đã được xóa' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pointRulesService.remove(id);
  }
}
