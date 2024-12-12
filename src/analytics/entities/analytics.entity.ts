import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Analytics {
  @ApiProperty({ description: 'ID thống kê' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Loại thống kê',
    enum: ['DAILY', 'WEEKLY', 'MONTHLY'],
  })
  @Column()
  type: string;

  @ApiProperty({ description: 'Ngày bắt đầu' })
  @Column()
  startDate: Date;

  @ApiProperty({ description: 'Ngày kết thúc' })
  @Column()
  endDate: Date;

  @ApiProperty({ description: 'Các chỉ số thống kê' })
  @Column('jsonb', { default: {} })
  metrics: Record<string, any>;

  @ApiProperty({ description: 'Ngày tạo' })
  @CreateDateColumn()
  createdAt: Date;
}
