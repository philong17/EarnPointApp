import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsIn,
  IsOptional,
  IsDate,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePointRuleDto {
  @ApiProperty({
    description: 'Tên quy tắc tích điểm',
    example: 'Khuyến mãi cuối tuần',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Loại quy tắc',
    enum: ['BASIC', 'SPECIAL', 'TIME_BASED'],
    example: 'TIME_BASED',
  })
  @IsString()
  @IsIn(['BASIC', 'SPECIAL', 'TIME_BASED'])
  type: string;

  @ApiProperty({
    description: 'Số tiền chi tiêu để được tích điểm',
    example: 100000,
  })
  @IsNumber()
  spendAmount: number;

  @ApiProperty({
    description: 'Số điểm được tích',
    example: 10,
  })
  @IsNumber()
  pointAmount: number;

  @ApiPropertyOptional({
    description: 'Thời gian bắt đầu áp dụng',
    example: '2024-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startTime?: Date;

  @ApiPropertyOptional({
    description: 'Thời gian kết thúc áp dụng',
    example: '2024-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endTime?: Date;

  @ApiPropertyOptional({
    description: 'Trạng thái kích hoạt',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Điều kiện bổ sung',
    example: { minPurchases: 5 },
  })
  @IsOptional()
  @IsObject()
  conditions?: Record<string, any>;
}
