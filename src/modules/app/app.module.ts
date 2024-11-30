import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from 'src/core/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/core/database/data-source';
import { CategoryModule } from '../category/category.module';
import { FrequencyModule } from '../frenquency/frequency.module';
import { ResponsibleModule } from '../responsible/responsible.module';
import { PreventiveModule } from '../preventive/preventive.module';
import { CurrentStatusModule } from '../current-status/current-status.module';
import { PreventiveHistoryModule } from '../preventive-history/preventive-history.module';
import { CorrectiveModule } from '../corrective/corrective.module';
import { CorrectiveHistoryModule } from '../corrective-history/corrective-history.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true, ...dataSourceOptions }),
    AuthModule,
    UsersModule,
    CategoryModule,
    FrequencyModule,
    ResponsibleModule,
    CurrentStatusModule,
    PreventiveModule,
    PreventiveHistoryModule,
    CorrectiveModule,
    CorrectiveHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
