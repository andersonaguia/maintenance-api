import { Module } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [],
})
export class CategoryModule {}
