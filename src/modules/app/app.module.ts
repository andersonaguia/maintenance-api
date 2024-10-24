import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from 'src/core/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/core/database/data-source';
import { CategoryModule } from '../category/category.module';
import { FrequencyModule } from '../frenquency/frequency.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true, ...dataSourceOptions }),
    AuthModule,
    UsersModule,
    CategoryModule,
    FrequencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
