import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { CurrentStatusController } from './controllers/current-status.controller';
import { CurrentStatusRepository } from './current-status.repository';
import { CurrentStatusService } from './services/current-status.service';

@Module({
  imports: [UsersModule],
  controllers: [CurrentStatusController],
  providers: [CurrentStatusRepository, CurrentStatusService],
  exports: [],
})
export class CurrentStatusModule {}
