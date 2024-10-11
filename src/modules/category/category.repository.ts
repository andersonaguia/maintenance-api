import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const categoryFound = await this.findOne({
          where: {
            name: name,
          },
        });
        resolve(categoryFound);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createCategory(
    name: string,
    userEntity: UserEntity,
  ): Promise<CategoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = new CategoryEntity();
        category.name = name;
        category.user = userEntity;

        const categorySaved = await this.save(category);
        resolve(categorySaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<CategoryEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allCategories = await this.find({
          where: { deletedAt: IsNull() },
        });
        resolve(allCategories);
      } catch (error) {
        reject(error);
      }
    });
  }
}
