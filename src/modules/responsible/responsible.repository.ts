import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ResponsibleEntity } from './entities/responsible.entity';
import { CreateResponsibleDto } from './dto/create-responsible.dto';

@Injectable()
export class ResponsibleRepository extends Repository<ResponsibleEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(ResponsibleEntity, dataSource.createEntityManager());
  }

  async findResponsibleByCompany(
    companyName: string,
  ): Promise<ResponsibleEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const responsibleFound = await this.findOne({
          where: {
            company: companyName.toUpperCase(),
            deletedAt: IsNull(),
          },
        });
        resolve(responsibleFound);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createResponsible(
    responsibleData: CreateResponsibleDto,
    userEntity: UserEntity,
  ): Promise<ResponsibleEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const responsible = new ResponsibleEntity();
        responsible.company = responsibleData.company.toUpperCase();
        responsible.phoneNumber = responsibleData.phoneNumber;
        responsible.email = responsibleData.email;
        responsible.contact = responsibleData.contact;
        responsible.user = userEntity;

        const responsibleSaved = await this.save(responsible);
        resolve(responsibleSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<ResponsibleEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allResponsible = await this.find({
          where: { deletedAt: IsNull() },
        });
        resolve(allResponsible);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findResponsibleById(id: number): Promise<ResponsibleEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const responsibleFound = await this.findOne({
          where: {
            id: +id,
            deletedAt: IsNull(),
          },
        });
        resolve(responsibleFound);
      } catch (error) {
        reject(error);
      }
    });
  }
}
