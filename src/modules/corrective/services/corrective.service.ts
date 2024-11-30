import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CorrectiveRepository } from '../corrective.repository';
import { CurrentStatusService } from '../../current-status/services/current-status.service';
import { CreateCorrectiveDto } from '../dto/create-corrective.dto';
import { CategoryService } from 'src/modules/category/services/category.service';
import { FrequencyService } from 'src/modules/frenquency/services/frequency.service';
import { ResponsibleService } from 'src/modules/responsible/services/responsible.service';
import { CorrectiveEntity } from '../entities/corrective.entity';

@Injectable()
export class CorrectiveService {
  constructor(
    private readonly correctiveRepository: CorrectiveRepository,
    private readonly usersRepository: UsersRepository,
    private readonly currentStatusService: CurrentStatusService,
    private readonly categoryService: CategoryService,
    private readonly frequencySevice: FrequencyService,
    private readonly responsibleService: ResponsibleService,
  ) {}

  create(
    correctiveData: CreateCorrectiveDto,
    req: any,
  ): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.categoryService.findById(
          +correctiveData.categoryId,
        );
        if (category) {
          const responsible = await this.responsibleService.findById(
            +correctiveData.responsibleId,
          );
          if (responsible) {
            const currentStatus = await this.currentStatusService.findById(
              +correctiveData.currentStatus,
            );
            if (currentStatus) {
              const user = await this.getUserEntity(+req.user.id);
              const correctiveSaved =
                await this.correctiveRepository.createCorrective(
                  correctiveData,
                  category,
                  responsible,
                  currentStatus,
                  user,
                );
              resolve({
                code: 201,
                message: 'Corretiva cadastrada com sucesso!',
              });
            } else {
              reject({ code: 404, message: 'Status não encontrado!' });
            }
          } else {
            reject({ code: 404, message: 'Responsável não encontrado!' });
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

  findAll(): Promise<CorrectiveEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allCorrective = await this.correctiveRepository.findAll();
        resolve(allCorrective);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findById(id: number): Promise<CorrectiveEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const frequency = await this.correctiveRepository.findCorrectiveById(
          +id,
        );
        resolve(frequency);
      } catch (error) {
        reject(error);
      }
    });
  }
}
