import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { NoticesRepository } from '../notices.repository';
import { NoticesEntity } from '../entities/notices.entity';
import { CreateNoticeDto } from '../dto/create-notice.dto';

@Injectable()
export class NoticesService {
  constructor(private readonly noticesRepository: NoticesRepository) {}

  create(noticeData: CreateNoticeDto): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        if (noticeData.correctiveId != noticeData.preventiveId) {
          const noticeSaved = await this.noticesRepository.createNotice(
            noticeData.preventiveId,
            noticeData.preventiveId,
            noticeData.sendingDate,
            noticeData.user,
          );
          resolve({
            code: 201,
            message: 'Agendamento de alerta criado com sucesso!',
          });
        } else {
          reject({
            code: 403,
            message:
              'Não é possível realizar o agendamento do alerta sem o ID da manutenção!',
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

  findAll(): Promise<NoticesEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allNotices = await this.noticesRepository.findAll();
        resolve(allNotices);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findById(id: number): Promise<NoticesEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const notice = await this.noticesRepository.findNoticeById(+id);
        resolve(notice);
      } catch (error) {
        reject(error);
      }
    });
  }
}
