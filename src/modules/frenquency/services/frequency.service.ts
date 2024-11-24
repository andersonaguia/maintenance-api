import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { FrequencyEntity } from '../entities/frequency.entity';
import { FrequencyRepository } from '../frequency.repository';

@Injectable()
export class FrequencyService {
  constructor(
    private readonly frequencyRepository: FrequencyRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createFrequency(
    name: string,
    req: any,
  ): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundFrequency =
          await this.frequencyRepository.findFrequencyByType(name);

        if (foundFrequency == null) {
          const id = req.user.id;
          const userEntity = await this.getUserEntity(+id);
          const frequencySaved = await this.frequencyRepository.createFrequency(
            name,
            userEntity,
          );
          if (frequencySaved.id) {
            resolve({
              code: 201,
              message: 'Periodicidade cadastrada com sucesso!',
            });
          }
        } else {
          reject({
            code: 409,
            message: 'Existe uma periodicidade cadastrada com o mesmo nome!',
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

  async findAll(): Promise<FrequencyEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allFrequency = await this.frequencyRepository.findAll();
        resolve(allFrequency);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findById(id: number): Promise<FrequencyEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const frequency = await this.frequencyRepository.findFrequencyById(+id);
        resolve(frequency);
      } catch (error) {
        reject(error);
      }
    });
  }
}
