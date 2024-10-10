import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersRepository } from 'src/modules/users/users.repository';
import { CredentialsDto } from '../dto/credentials.dto';
import { JwtTokenDto } from '../dto/jwt-token.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async signUp(userData: CreateUserDto): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        if (userData.password != userData.passwordConfirmation) {
          resolve(null);
        }

        const userCreated = await this.usersRepository.createUser(userData);
        delete userCreated.password;
        delete userCreated.salt;

        resolve({
          code: 201,
          message: 'Usuário cadastrado com sucesso!',
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async signIn(credentials: CredentialsDto): Promise<JwtTokenDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.checkCredentials(credentials);

        if (user === null) {
          reject({ code: 401, message: 'E-mail ou senha inválidos!' });
        }
        const firstName = user.name.split(' ');

        const jwtPayload = {
          id: user.id,
          firstName: firstName[0],
          occupation: user.occupation,
          email: user.email,
          role: user.role,
        };
        const token = new JwtTokenDto();
        token.token = this.jwtService.sign(jwtPayload);
        resolve(token);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async checkCredentials(credentials: CredentialsDto) {
    const { password } = credentials;
    const user = await this.usersRepository.checkCredentials(credentials);

    if (user && (await user.checkPassword(password))) {
      return user;
    }
    return null;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  validateToken(jwtToken: string) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await this.jwtService.verifyAsync(jwtToken, {
            ignoreExpiration: false,
          }),
        );
      } catch (error) {
        reject({
          code: 401,
          detail: 'JWT expired.',
        });
      }
    });
  }

  decodedToken(jwtToken: string) {
    return this.jwtService.decode(jwtToken);
  }

  async changePassword(data: ChangePasswordDto): Promise<number> {
    const { email, oldPassword, newPassword } = data;
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = new CredentialsDto();
        credentials.email = email;
        credentials.password = oldPassword;

        const user = await this.checkCredentials(credentials);

        if (user === null) {
          resolve(null);
        }
        const dataToUpdate = new UpdatePasswordDto();
        dataToUpdate.password = await this.hashPassword(newPassword, user.salt);
        dataToUpdate.updatedAt = new Date();
        user.salt = await bcrypt.genSalt(12);

        const success = await this.updateUserPassword(user.id, dataToUpdate);
        resolve(success);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  updateUserPassword(
    id: number,
    dataToUpdate: UpdatePasswordDto,
  ): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const { affected } = await this.usersRepository.update(
          { id: id },
          dataToUpdate,
        );
        if (affected === 0) {
          resolve(affected);
        }
        resolve(affected);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }
}
