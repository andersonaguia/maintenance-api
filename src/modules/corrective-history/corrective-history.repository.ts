import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { CorrectiveHistoryEntity } from './entities/corrective-history.entity';
import { CurrentStatusEntity } from '../current-status/entities/current-status.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CorrectiveEntity } from 'src/modules/corrective/entities/corrective.entity';

@Injectable()
export class CorrectiveHistoryRepository extends Repository<CorrectiveHistoryEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(CorrectiveHistoryEntity, dataSource.createEntityManager());
  }

  async createHistory(
    comments: string,
    corrective: CorrectiveEntity,
    currentStatus: CurrentStatusEntity,
    user: UserEntity,
  ): Promise<CorrectiveHistoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const correctiveHistory = new CorrectiveHistoryEntity();
        correctiveHistory.comments = comments;
        correctiveHistory.correctiveId = corrective;
        correctiveHistory.currentStatus = currentStatus;
        correctiveHistory.user = user;

        const correctiveHistorySaved = await this.save(correctiveHistory);
        resolve(correctiveHistorySaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<CorrectiveHistoryEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allCorrectiveHistory = await this.find({
          where: { deletedAt: IsNull() },
          relations: {
            currentStatus: true,
            user: true,
            correctiveId: true,
          },
        });
        resolve(allCorrectiveHistory);
      } catch (error) {
        reject(error);
      }
    });
  }
}
