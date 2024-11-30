import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CurrentStatusService } from '../../current-status/services/current-status.service';
import { CreateCorrectiveHistoryDto } from '../dto/create-corrective-history.dto';
import { CorrectiveHistoryRepository } from '../corrective-history.repository';
import { CorrectiveService } from 'src/modules/corrective/services/corrective.service';
import { CorrectiveHistoryEntity } from '../entities/corrective-history.entity';

@Injectable()
export class CorrectiveHistoryService {
  constructor(
    private readonly correctiveHistoryRepository: CorrectiveHistoryRepository,
    private readonly correctiveService: CorrectiveService,
    private readonly CurrentStatusService: CurrentStatusService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(
    correctiveHistoryData: CreateCorrectiveHistoryDto,
    req: any,
  ): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const corrective = await this.correctiveService.findById(
          +correctiveHistoryData.preventiveId,
        );

        if (corrective) {
          const currentStatus = await this.CurrentStatusService.findById(
            +correctiveHistoryData.currentStatusId,
          );
          if (currentStatus) {
            const user = await this.getUserEntity(+req.user.id);
            const preventiveSaved =
              await this.correctiveHistoryRepository.createHistory(
                correctiveHistoryData.comments,
                corrective,
                currentStatus,
                user,
              );
            resolve({
              code: 201,
              message: 'Manutenção Corretiva atualizada com sucesso!',
            });
          } else {
            reject({
              code: 404,
              message: 'Status da manutenção não encontrado!',
            });
          }
        } else {
          reject({
            code: 404,
            message: 'Manutenção Corretiva não encontrada!',
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

  async findAll(): Promise<CorrectiveHistoryEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allCorrectiveHistory =
          await this.correctiveHistoryRepository.findAll();
        resolve(allCorrectiveHistory);
      } catch (error) {
        reject(error);
      }
    });
  }
}
