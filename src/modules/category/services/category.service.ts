import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createCategory(
    category: string,
    req: any,
  ): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundCategory = await this.categoryRepository.findCategoryByName(
          category.toUpperCase(),
        );

        if (foundCategory == null) {
          const id = req.user.id;
          const userEntity = await this.getUserEntity(+id);
          const categorySaved = await this.categoryRepository.createCategory(
            category.toUpperCase(),
            userEntity,
          );
          if (categorySaved.id) {
            resolve({
              code: 201,
              message: 'Categoria cadastrada com sucesso!',
            });
          }
        } else {
          reject({
            code: 409,
            message: 'Existe uma categoria cadastrada com o mesmo nome!',
            error: 'Conflict',
          });
        }
      } catch (error) {
        if (error.query) {
          reject({
            code: 500,
            message: error.sqlMessage,
            sqlError: error.errno,
          });
        } else {
          reject(error);
        }
      }
    });
  }

  async getUserEntity(id: number): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.usersRepository.findById(+id);
        if (user == null) {
          reject({
            code: 404,
            message: 'Usuário não encontrado!',
            error: 'Not Found',
          });
        } else {
          resolve(user);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<CategoryEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allCategories = await this.categoryRepository.findAll();
        resolve(allCategories);
      } catch (error) {
        reject(error);
      }
    });
  }
}
