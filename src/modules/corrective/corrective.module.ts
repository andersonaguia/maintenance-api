import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { FrequencyModule } from '../frenquency/frequency.module';
import { ResponsibleModule } from '../responsible/responsible.module';
import { CategoryModule } from '../category/category.module';
import { CurrentStatusModule } from '../current-status/current-status.module';
import { CorrectiveRepository } from './corrective.repository';
import { CorrectiveService } from './services/corrective.service';
import { CorrectiveController } from './controllers/corrective.controller';

@Module({
  imports: [
    UsersModule,
    CategoryModule,
    FrequencyModule,
    ResponsibleModule,
    CurrentStatusModule,
  ],
  controllers: [CorrectiveController],
  providers: [CorrectiveRepository, CorrectiveService],
  exports: [CorrectiveService],
})
export class CorrectiveModule {}
