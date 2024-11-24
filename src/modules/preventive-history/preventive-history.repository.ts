import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { PreventiveHistoryEntity } from './entities/preventive-history.entity';
import { CreatePreventiveHistoryDto } from './dto/create-preventive-history.dto';
import { PreventiveEntity } from '../preventive/entities/preventive.entity';
import { CurrentStatusEntity } from '../current-status/entities/current-status.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class PreventiveHistoryRepository extends Repository<PreventiveHistoryEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(PreventiveHistoryEntity, dataSource.createEntityManager());
  }

  async createHistory(
    comments: string,
    preventive: PreventiveEntity,
    currentStatus: CurrentStatusEntity,
    user: UserEntity,
  ): Promise<PreventiveHistoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const preventiveHistory = new PreventiveHistoryEntity();
        preventiveHistory.comments = comments;
        preventiveHistory.preventiveId = preventive;
        preventiveHistory.currentStatus = currentStatus;
        preventiveHistory.user = user;

        const preventiveHistorySaved = await this.save(preventiveHistory);
        resolve(preventiveHistorySaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<PreventiveHistoryEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allPreventiveHistory = await this.find({
          where: { deletedAt: IsNull() },
          relations: {
            currentStatus: true,
            user: true,
            preventiveId: true,
          },
        });
        resolve(allPreventiveHistory);
      } catch (error) {
        reject(error);
      }
    });
  }
}
