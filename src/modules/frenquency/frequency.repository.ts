import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { FrequencyEntity } from './entities/frequency.entity';
import { Frequency } from './enum/frequency.enum';

@Injectable()
export class FrequencyRepository extends Repository<FrequencyEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(FrequencyEntity, dataSource.createEntityManager());
  }

  async findFrequencyByType(frequency: Frequency): Promise<FrequencyEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const frequencyFound = await this.findOne({
          where: {
            type: frequency
          },
        });
        resolve(frequencyFound);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createFrequency(
    type: Frequency,
    userEntity: UserEntity,
  ): Promise<FrequencyEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const frequency = new FrequencyEntity();
        frequency.type = type;
        frequency.user = userEntity;

        const frequencySaved = await this.save(frequency);
        resolve(frequencySaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<FrequencyEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allFrequency = await this.find({
          where: { deletedAt: IsNull() },
        });
        resolve(allFrequency);
      } catch (error) {
        reject(error);
      }
    });
  }
}
