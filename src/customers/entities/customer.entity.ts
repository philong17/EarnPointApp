import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Customer {
  @ApiProperty({ description: 'ID khách hàng' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Tên khách hàng', example: 'Nguyễn Văn A' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Email khách hàng',
    example: 'nguyenvana@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Số điện thoại', example: '0123456789' })
  @Column()
  phone: string;

  @ApiProperty({ description: 'Số điểm hiện tại', example: 100, default: 0 })
  @Column({ default: 0 })
  points: number;

  @ApiProperty({ description: 'Trạng thái hoạt động', default: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Ngày tạo' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Ngày cập nhật' })
  @UpdateDateColumn()
  updatedAt: Date;
}
