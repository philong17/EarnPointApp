import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePointDto } from './dto/create-point.dto';
import { Point } from './entities/point.entity';
import { Customer } from '../customers/entities/customer.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createPointDto: CreatePointDto) {
    // Kiểm tra customer có tồn tại
    const customer = await this.customerRepository.findOne({
      where: { id: createPointDto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Tạo transaction điểm
    const point = this.pointRepository.create(createPointDto);
    await this.pointRepository.save(point);

    // Cập nhật tổng điểm của customer
    if (createPointDto.type === 'EARN') {
      customer.points += createPointDto.points;
    } else if (createPointDto.type === 'REDEEM') {
      if (customer.points < createPointDto.points) {
        throw new Error('Insufficient points');
      }
      customer.points -= createPointDto.points;
    }

    await this.customerRepository.save(customer);

    return point;
  }

  findAll() {
    return this.pointRepository.find({
      relations: ['customer'],
    });
  }

  findOne(id: number) {
    return this.pointRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
  }

  async findByCustomer(customerId: number) {
    return this.pointRepository.find({
      where: { customerId },
      relations: ['customer'],
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: number) {
    const point = await this.findOne(id);
    if (!point) {
      throw new NotFoundException('Point transaction not found');
    }
    return this.pointRepository.remove(point);
  }
}
