import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { FrequencyModule } from '../frenquency/frequency.module';
import { ResponsibleModule } from '../responsible/responsible.module';
import { CategoryModule } from '../category/category.module';
import { CurrentStatusModule } from '../current-status/current-status.module';
import { PreventiveRepository } from './preventive.repository';
import { PreventiveService } from './services/preventive.service';
import { PreventiveController } from './controllers/preventive.controller';

@Module({
  imports: [
    UsersModule,
    CategoryModule,
    FrequencyModule,
    ResponsibleModule,
    CurrentStatusModule,
  ],
  controllers: [PreventiveController],
  providers: [PreventiveRepository, PreventiveService],
  exports: [PreventiveService],
})
export class PreventiveModule {}
