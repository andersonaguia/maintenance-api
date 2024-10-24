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
import { CreateFrequencyDto } from '../dto/create-frequency.dto';
import { FrequencyEntity } from '../entities/frequency.entity';
import { FrequencyService } from '../services/frequency.service';

@Controller('frequency')
export class FrequencyController {
  constructor(private readonly frequencyService: FrequencyService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('/create')
  async create(
    @Body() frequency: CreateFrequencyDto,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      const result = await this.frequencyService.createFrequency(
        frequency.type,
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
  async findAll(): Promise<FrequencyEntity[]> {
    try {
      const result = await this.frequencyService.findAll();
      return result;
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
