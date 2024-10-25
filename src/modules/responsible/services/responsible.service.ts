import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ResponsibleRepository } from '../responsible.repository';
import { CreateResponsibleDto } from '../dto/create-responsible.dto';
import { ResponsibleEntity } from '../entities/responsible.entity';

@Injectable()
export class ResponsibleService {
  constructor(
    private readonly responsibleRepository: ResponsibleRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createResponsible(
    responsibleData: CreateResponsibleDto,
    req: any,
  ): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const responsibleFound =
          await this.responsibleRepository.findResponsibleByCompany(responsibleData.company);

        if (responsibleFound == null) {
          const id = req.user.id;
          const userEntity = await this.getUserEntity(+id);
          const responsibleSaved = await this.responsibleRepository.createResponsible(
            responsibleData,
            userEntity,
          );
          if (responsibleSaved.id) {
            resolve({
              code: 201,
              message: 'Responsável cadastrado com sucesso!',
            });
          }
        } else {
          reject({
            code: 409,
            message: 'Existe um responsável cadastrado com o mesmo nome!',
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

  async findAll(): Promise<ResponsibleEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allResponsible = await this.responsibleRepository.findAll();
        resolve(allResponsible);
      } catch (error) {
        reject(error);
      }
    });
  }
}
