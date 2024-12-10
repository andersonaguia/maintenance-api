import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { NoticesEntity } from './entities/notices.entity';
import { CorrectiveEntity } from '../corrective/entities/corrective.entity';
import { PreventiveEntity } from '../preventive/entities/preventive.entity';

@Injectable()
export class NoticesRepository extends Repository<NoticesEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(NoticesEntity, dataSource.createEntityManager());
  }

  async createNotice(
    preventiveId: PreventiveEntity | null,
    correctiveId: CorrectiveEntity | null,
    sendingDate: Date,
    user: UserEntity | null,
  ): Promise<NoticesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const notice = new NoticesEntity();
        notice.correctiveId = correctiveId;
        notice.preventiveId = preventiveId;
        notice.sendingDate = sendingDate;
        notice.wasSent = false;
        notice.user = user;

        const noticeSaved = await this.save(notice);

        resolve(noticeSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<NoticesEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allNotices = await this.find({
          where: { deletedAt: IsNull() },
          relations: {
            preventiveId: true,
            correctiveId: true,
            user: true,
          },
        });
        resolve(allNotices);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findNoticeById(id: number): Promise<NoticesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const noticefound = await this.findOne({
          where: {
            id: +id,
            deletedAt: IsNull(),
          },
        });
        resolve(noticefound);
      } catch (error) {
        reject(error);
      }
    });
  }
}
