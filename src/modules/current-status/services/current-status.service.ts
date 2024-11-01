import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CurrentStatusRepository } from '../current-status.repository';
import { CurrentStatusEntity } from '../entities/current-status.entity';

@Injectable()
export class CurrentStatusService {
  constructor(
    private readonly currentStatusRepository: CurrentStatusRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createCurrentStatus(
    currentStatus: string,
    req: any,
  ): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const currentStatusFound =
          await this.currentStatusRepository.findCurrentStatusByName(
            currentStatus.toUpperCase(),
          );

        if (currentStatusFound == null) {
          const id = req.user.id;
          const userEntity = await this.getUserEntity(+id);
          const currentStatusSaved =
            await this.currentStatusRepository.createCurrentStatus(
              currentStatus.toUpperCase(),
              userEntity,
            );
          if (currentStatusSaved.id) {
            resolve({
              code: 201,
              message: 'Status cadastrado com sucesso!',
            });
          }
        } else {
          reject({
            code: 409,
            message: 'Existe um status cadastrado com o mesmo nome!',
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

  async findAll(): Promise<CurrentStatusEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allCurrentStatus = await this.currentStatusRepository.findAll();
        resolve(allCurrentStatus);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findById(id: number): Promise<CurrentStatusEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const currentStatus =
          await this.currentStatusRepository.findCurrentStatusById(+id);
        resolve(currentStatus);
      } catch (error) {
        reject(error);
      }
    });
  }
}
