import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { CurrentStatusModule } from '../current-status/current-status.module';
import { PreventiveHistoryRepository } from './preventive-history.repository';
import { PreventiveHistoryService } from './services/preventive-history.service';
import { PreventiveHistoryController } from './controllers/preventive-history.controller';
import { PreventiveModule } from '../preventive/preventive.module';

@Module({
  imports: [UsersModule, CurrentStatusModule, PreventiveModule],
  controllers: [PreventiveHistoryController],
  providers: [PreventiveHistoryRepository, PreventiveHistoryService],
  exports: [],
})
export class PreventiveHistoryModule {}
