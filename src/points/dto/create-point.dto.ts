import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsIn, IsOptional } from 'class-validator';

export class CreatePointDto {
  @ApiProperty({
    description: 'Số điểm',
    example: 100,
  })
  @IsNumber()
  points: number;

  @ApiProperty({
    description: 'Loại giao dịch điểm',
    enum: ['EARN', 'REDEEM'],
    example: 'EARN',
  })
  @IsString()
  @IsIn(['EARN', 'REDEEM'])
  type: string;

  @ApiPropertyOptional({
    description: 'Mô tả giao dịch',
    example: 'Tích điểm mua hàng',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'ID khách hàng',
    example: 1,
  })
  @IsNumber()
  customerId: number;
}
