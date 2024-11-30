import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/core/auth/guards/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles/roles.guard';
import { UserRole } from 'src/modules/users/enum/user.role';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { CorrectiveHistoryService } from '../services/corrective-history.service';
import { CreateCorrectiveHistoryDto } from '../dto/create-corrective-history.dto';
import { CorrectiveHistoryEntity } from '../entities/corrective-history.entity';

@Controller('corrective-history')
export class CorrectiveHistoryController {
  constructor(
    private readonly correctiveHistoryService: CorrectiveHistoryService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('/create')
  async create(
    @Body() correctiveHistoryData: CreateCorrectiveHistoryDto,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      const result = await this.correctiveHistoryService.create(
        correctiveHistoryData,
        req,
      );
      return result;
    } catch (error) {
      if (error.code == 404) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      } else if (error.code == 409) {
        throw new HttpException(error, HttpStatus.CONFLICT);
      } else if (error.code == 500) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('/findall')
  async findAll(): Promise<CorrectiveHistoryEntity[]> {
    try {
      const result = await this.correctiveHistoryService.findAll();
      return result;
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
