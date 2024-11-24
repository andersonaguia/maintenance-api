import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CurrentStatusService } from '../../current-status/services/current-status.service';
import { CreatePreventiveHistoryDto } from '../dto/create-preventive-history.dto';
import { PreventiveHistoryEntity } from '../entities/preventive-history.entity';
import { PreventiveHistoryRepository } from '../preventive-history.repository';
import { PreventiveService } from 'src/modules/preventive/services/preventive.service';

@Injectable()
export class PreventiveHistoryService {
  constructor(
    private readonly preventiveHistoryRepository: PreventiveHistoryRepository,
    private readonly preventiveService: PreventiveService,
    private readonly CurrentStatusService: CurrentStatusService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(
    preventiveHistoryData: CreatePreventiveHistoryDto,
    req: any,
  ): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const preventive = await this.preventiveService.findById(
          +preventiveHistoryData.preventiveId,
        );

        if (preventive) {
          const currentStatus = await this.CurrentStatusService.findById(
            +preventiveHistoryData.currentStatusId,
          );
          if (currentStatus) {
            const user = await this.getUserEntity(+req.user.id);
            const preventiveSaved =
              await this.preventiveHistoryRepository.createHistory(
                preventiveHistoryData.comments,
                preventive,
                currentStatus,
                user,
              );
            resolve({
              code: 201,
              message: 'Manutenção Preventiva atualizada com sucesso!',
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
            message: 'Manutenção Preventiva não encontrada!',
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

  async findAll(): Promise<PreventiveHistoryEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allPreventiveHistory =
          await this.preventiveHistoryRepository.findAll();
        resolve(allPreventiveHistory);
      } catch (error) {
        reject(error);
      }
    });
  }
}
