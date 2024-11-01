import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { FrequencyController } from './controllers/frequency.controller';
import { FrequencyRepository } from './frequency.repository';
import { FrequencyService } from './services/frequency.service';

@Module({
  imports: [UsersModule],
  controllers: [FrequencyController],
  providers: [FrequencyRepository, FrequencyService],
  exports: [FrequencyService],
})
export class FrequencyModule {}
