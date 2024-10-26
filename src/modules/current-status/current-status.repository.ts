import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { CurrentStatusEntity } from './entities/current-status.entity';

@Injectable()
export class CurrentStatusRepository extends Repository<CurrentStatusEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(CurrentStatusEntity, dataSource.createEntityManager());
  }

  async findCurrentStatusByName(name: string): Promise<CurrentStatusEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const currentStatusFound = await this.findOne({
          where: {
            name: name,
          },
        });
        resolve(currentStatusFound);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createCurrentStatus(
    name: string,
    userEntity: UserEntity,
  ): Promise<CurrentStatusEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const currentStatus = new CurrentStatusEntity();
        currentStatus.name = name;
        currentStatus.user = userEntity;

        const currentStatusSaved = await this.save(currentStatus);
        resolve(currentStatusSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<CurrentStatusEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allCurrentStatus = await this.find({
          where: { deletedAt: IsNull() },
        });
        resolve(allCurrentStatus);
      } catch (error) {
        reject(error);
      }
    });
  }
}
