import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<string> {
    const user = await this.userService.findOneByEmail(createUserDto.email);

    if (!user) {
      await this.userService.create(createUserDto);

      return 'usuario creado';
    }

    return 'usuario ya existe';
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<{
    access_token: string;
  }> {
    const user = await this.userService.findOneByEmail(loginUserDto.email);

    if (user?.password !== loginUserDto.password) {
      throw new UnauthorizedException('bad credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
