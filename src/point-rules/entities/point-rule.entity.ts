import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class PointRule {
  @ApiProperty({ description: 'ID quy tắc' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Tên quy tắc', example: 'Khuyến mãi cuối tuần' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Loại quy tắc',
    enum: ['BASIC', 'SPECIAL', 'TIME_BASED'],
    example: 'TIME_BASED',
  })
  @Column()
  type: string;

  @ApiProperty({ description: 'Số tiền chi tiêu', example: 100000 })
  @Column('decimal', { default: 0 })
  spendAmount: number;

  @ApiProperty({ description: 'Số điểm được tích', example: 10 })
  @Column('decimal', { default: 0 })
  pointAmount: number;

  @ApiPropertyOptional({ description: 'Thời gian bắt đầu' })
  @Column({ nullable: true })
  startTime: Date;

  @ApiPropertyOptional({ description: 'Thời gian kết thúc' })
  @Column({ nullable: true })
  endTime: Date;

  @ApiProperty({ description: 'Trạng thái kích hoạt', default: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiPropertyOptional({ description: 'Điều kiện bổ sung' })
  @Column('jsonb', { nullable: true })
  conditions: Record<string, any>;

  @ApiProperty({ description: 'Ngày tạo' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Ngày cập nhật' })
  @UpdateDateColumn()
  updatedAt: Date;
}
