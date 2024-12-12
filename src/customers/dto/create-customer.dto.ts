import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Tên khách hàng',
    example: 'Nguyễn Văn A',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email khách hàng',
    example: 'nguyenvana@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Số điện thoại',
    example: '0123456789',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiPropertyOptional({
    description: 'Mật khẩu (tùy chọn)',
    example: '********',
  })
  @IsString()
  @IsOptional()
  password?: string;
}
