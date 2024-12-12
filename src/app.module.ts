import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/entities/customer.entity';
import { PointsModule } from './points/points.module';
import { Point } from './points/entities/point.entity';
import { PointRulesModule } from './point-rules/point-rules.module';
import { PointRule } from './point-rules/entities/point-rule.entity';
import { AnalyticsModule } from './analytics/analytics.module';
import { Analytics } from './analytics/entities/analytics.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [Customer, Point, PointRule, Analytics],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    CustomersModule,
    PointsModule,
    PointRulesModule,
    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
