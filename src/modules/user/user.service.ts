import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../entities/user.entity';
import { CreateUserDtoInput } from 'src/dtos/create-user/create-user.dto.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDtoInput: CreateUserDtoInput): Promise<User> {
    const { password, ...rest } = createUserDtoInput;

    const newUser = {
      ...rest,
      password: await bcrypt.hash(
        password,
        this.configService.get<number>('SALT_ROUNDS'),
      ),
    };

    return await this.usersRepository.save(new User(newUser));
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOneBy(options: FindOptionsWhere<User>): Promise<User | null> {
    return await this.usersRepository.findOneBy(options);
  }
}
