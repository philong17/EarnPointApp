import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../../customers/entities/customer.entity';

@Entity()
export class Point {
  @ApiProperty({ description: 'ID giao dịch điểm' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Số điểm', example: 100 })
  @Column('decimal', { default: 0 })
  points: number;

  @ApiProperty({
    description: 'Loại giao dịch',
    enum: ['EARN', 'REDEEM'],
    example: 'EARN',
  })
  @Column()
  type: string;

  @ApiProperty({
    description: 'Mô tả giao dịch',
    example: 'Tích điểm mua hàng',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'ID khách hàng' })
  @Column()
  customerId: number;

  @ApiProperty({ description: 'Thông tin khách hàng', type: () => Customer })
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ApiProperty({ description: 'Ngày tạo' })
  @CreateDateColumn()
  createdAt: Date;
}
