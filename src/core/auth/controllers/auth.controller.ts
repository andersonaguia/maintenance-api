import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/signin.dto';
import { JwtTokenDto } from '../dto/jwt-token.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @HttpCode(200)
  async singIn(@Body() credentials: SignInDto): Promise<JwtTokenDto> {
    try {
      const result =  await this.authService.signIn(credentials);
      return result;
    } catch (error) {
      if (error.code == 401) {
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  /*@UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)*/
  @Post('/signup')
  async signUp(
    @Body() user: CreateUserDto,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      const result = await this.authService.signUp(user);
      return result;
    } catch (error) {
      if (error.statusCode == 409) {
        throw new HttpException(error, HttpStatus.CONFLICT);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
