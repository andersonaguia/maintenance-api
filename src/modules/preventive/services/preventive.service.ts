import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { PreventiveRepository } from '../preventive.repository';
import { CurrentStatusService } from '../../current-status/services/current-status.service';
import { CreatePreventiveDto } from '../dto/create-preventive.dto';
import { CategoryService } from 'src/modules/category/services/category.service';
import { FrequencyService } from 'src/modules/frenquency/services/frequency.service';
import { ResponsibleService } from 'src/modules/responsible/services/responsible.service';
import { PreventiveEntity } from '../entities/preventive.entity';

@Injectable()
export class PreventiveService {
  constructor(
    private readonly preventiveRepository: PreventiveRepository,
    private readonly usersRepository: UsersRepository,
    private readonly currentStatusService: CurrentStatusService,
    private readonly categoryService: CategoryService,
    private readonly frequencySevice: FrequencyService,
    private readonly responsibleService: ResponsibleService,
  ) {}

  create(
    preventiveData: CreatePreventiveDto,
    req: any,
  ): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.categoryService.findById(
          +preventiveData.categoryId,
        );
        if (category) {
          const frequency = await this.frequencySevice.findById(
            +preventiveData.frequencyId,
          );
          if (frequency) {
            const responsible = await this.responsibleService.findById(
              +preventiveData.responsibleId,
            );
            if (responsible) {
              const currentStatus = await this.currentStatusService.findById(
                +preventiveData.currentStatus,
              );
              if (currentStatus) {
                const user = await this.getUserEntity(+req.user.id);
                const preventiveSaved =
                  await this.preventiveRepository.createPreventive(
                    preventiveData,
                    category,
                    frequency,
                    responsible,
                    currentStatus,
                    user,
                  );
                resolve({
                  code: 201,
                  message: 'Preventiva cadastrada com sucesso!',
                });
              } else {
                reject({ code: 404, message: 'Status não encontrado!' });
              }
            } else {
              reject({ code: 404, message: 'Responsável não encontrado!' });
            }
          } else {
            reject({ code: 404, message: 'Periodicidade não encontrada!' });
          }
        } else {
          reject({ code: 404, message: 'Categoria não encontrada!' });
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

  getUserEntity(id: number): Promise<UserEntity> {
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

  findAll(): Promise<PreventiveEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allPreventive = await this.preventiveRepository.findAll();
        resolve(allPreventive);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findById(id: number): Promise<PreventiveEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const frequency = await this.preventiveRepository.findPreventiveById(+id);
        resolve(frequency);
      } catch (error) {
        reject(error);
      }
    });
  }
}
