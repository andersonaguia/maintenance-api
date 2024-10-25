import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ResponsibleRepository } from './responsible.repository';
import { ResponsibleService } from './services/responsible.service';
import { ResponsibleController } from './controllers/responsible.controller';

@Module({
  imports: [UsersModule],
  controllers: [ResponsibleController],
  providers: [ResponsibleRepository, ResponsibleService],
  exports: [],
})
export class ResponsibleModule {}
