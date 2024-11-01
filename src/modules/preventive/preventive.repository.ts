import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { PreventiveEntity } from './entities/preventive.entity';
import { CreatePreventiveDto } from './dto/create-preventive.dto';
import { CategoryEntity } from '../category/entities/category.entity';
import { FrequencyEntity } from '../frenquency/entities/frequency.entity';
import { CurrentStatusEntity } from '../current-status/entities/current-status.entity';
import { ResponsibleEntity } from '../responsible/entities/responsible.entity';

@Injectable()
export class PreventiveRepository extends Repository<PreventiveEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(PreventiveEntity, dataSource.createEntityManager());
  }

  async createPreventive(
    preventiveData: CreatePreventiveDto,
    category: CategoryEntity,
    frequency: FrequencyEntity,
    responsible: ResponsibleEntity,
    currentStatus: CurrentStatusEntity,
    userEntity: UserEntity,
  ): Promise<PreventiveEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const preventive = new PreventiveEntity();
        preventive.description = preventiveData.description;
        preventive.category = category;
        preventive.frequency = frequency;
        preventive.responsible = responsible;
        preventive.sendNotice = preventiveData.sendNotice;

        if (preventiveData.sendNotice) {
          preventiveData.noticeDate != null
            ? (preventive.noticeDate = new Date(preventiveData.noticeDate))
            : (preventive.noticeDate = new Date(preventiveData.next));
        } else {
          preventive.noticeDate = null;
        }
        preventive.currentStatus = currentStatus;
        preventive.next = new Date(preventiveData.next);

        preventive.user = userEntity;

        const preventiveSaved = await this.save(preventive);
        resolve(preventiveSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<PreventiveEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allPreventive = await this.find({
          where: { deletedAt: IsNull() },
          relations: {
            category: true,
            currentStatus: true,
            responsible: true,
            frequency: true,
          },
        });
        resolve(allPreventive);
      } catch (error) {
        reject(error);
      }
    });
  }
}
