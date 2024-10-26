import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { FrequencyModule } from '../frenquency/frequency.module';
import { ResponsibleModule } from '../responsible/responsible.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [UsersModule, CategoryModule, FrequencyModule, ResponsibleModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class PreventiveModule {}
