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
import { CategoryService } from '../services/category.service';
import { Roles } from 'src/core/auth/guards/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles/roles.guard';
import { UserRole } from 'src/modules/users/enum/user.role';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { CategoryEntity } from '../entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('/create')
  async create(
    @Body() category: CreateCategoryDto,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      const result = await this.categoryService.createCategory(
        category.name,
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
  async findAll(): Promise<CategoryEntity[]> {
    try {
      const result = await this.categoryService.findAll();
      return result;
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
