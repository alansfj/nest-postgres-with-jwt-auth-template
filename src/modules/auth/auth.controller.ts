import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Public } from 'src/common/decorators/is-public.decorator.nest';
import { ZodValidationPipe } from 'src/common/pipes/validation.pipe';
import {
  CreateUserDto,
  createUserSchema,
} from 'src/common/schemas/create-user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test(@Request() req) {
    return req.user;
  }
}
