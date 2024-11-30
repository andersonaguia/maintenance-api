import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { CurrentStatusModule } from '../current-status/current-status.module';
import { CorrectiveHistoryController } from './controllers/corrective-history.controller';
import { CorrectiveHistoryRepository } from './corrective-history.repository';
import { CorrectiveHistoryService } from './services/corrective-history.service';
import { CorrectiveModule } from '../corrective/corrective.module';

@Module({
  imports: [UsersModule, CurrentStatusModule, CorrectiveModule],
  controllers: [CorrectiveHistoryController],
  providers: [CorrectiveHistoryRepository, CorrectiveHistoryService],
  exports: [],
})
export class CorrectiveHistoryModule {}
