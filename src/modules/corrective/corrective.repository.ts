import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { CorrectiveEntity } from './entities/corrective.entity';
import { CreateCorrectiveDto } from './dto/create-corrective.dto';
import { CategoryEntity } from '../category/entities/category.entity';
import { FrequencyEntity } from '../frenquency/entities/frequency.entity';
import { CurrentStatusEntity } from '../current-status/entities/current-status.entity';
import { ResponsibleEntity } from '../responsible/entities/responsible.entity';

@Injectable()
export class CorrectiveRepository extends Repository<CorrectiveEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(CorrectiveEntity, dataSource.createEntityManager());
  }

  async createCorrective(
    correctiveData: CreateCorrectiveDto,
    category: CategoryEntity,
    responsible: ResponsibleEntity,
    currentStatus: CurrentStatusEntity,
    userEntity: UserEntity,
  ): Promise<CorrectiveEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const corrective = new CorrectiveEntity();
        corrective.description = correctiveData.description;
        corrective.category = category;
        corrective.responsible = responsible;
        corrective.sendNotice = correctiveData.sendNotice;

        if (correctiveData.sendNotice) {
          correctiveData.noticeDate != null
            ? (corrective.noticeDate = new Date(correctiveData.noticeDate))
            : (corrective.noticeDate = new Date(correctiveData.next));
        } else {
          corrective.noticeDate = null;
        }
        corrective.currentStatus = currentStatus;
        corrective.next = new Date(correctiveData.next);

        corrective.user = userEntity;

        const correctiveSaved = await this.save(corrective);
        resolve(correctiveSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<CorrectiveEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allCorrective = await this.find({
          where: { deletedAt: IsNull() },
          relations: {
            category: true,
            currentStatus: true,
            responsible: true,
          },
        });
        resolve(allCorrective);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findCorrectiveById(id: number): Promise<CorrectiveEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const correctiveFound = await this.findOne({
          where: {
            id: +id,
            deletedAt: IsNull(),
          },
        });
        resolve(correctiveFound);
      } catch (error) {
        reject(error);
      }
    });
  }
}
