import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<{
    access_token: string;
  }> {
    return this.authService.loginUser(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('test')
  getProfile(@Request() req) {
    return req.user;
  }
}
