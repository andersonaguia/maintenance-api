import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectDataSource } from '@nestjs/typeorm';
import { CredentialsDto } from 'src/core/auth/dto/credentials.dto';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async checkCredentials(credentials: CredentialsDto): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { email } = credentials;
        const userFound = await this.findOne({
          where: { email: email },
        });
        resolve(userFound);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createUser(newUser: CreateUserDto): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, email, password, occupation, role } = newUser;

        const user = new UserEntity();
        user.name = name;
        user.occupation = occupation;
        user.salt = await bcrypt.genSalt(12);
        user.password = await this.hashPassword(password, user.salt);
        user.role = role;
        user.email = email;
        user.active = true;

        const userSaved = await this.save(user);
        resolve(userSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findById(id: number): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.findOne({ where: { id: id } });
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
}
