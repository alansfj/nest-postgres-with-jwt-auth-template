import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Public } from 'src/common/decorators/is-public.decorator.nest';
import { ZodValidationPipe } from 'src/common/pipes/validation.pipe';
import { createUserSchema } from 'src/common/schemas/create-user.schema';
import { CreateUserDtoInput } from 'src/dtos/create-user/create-user.dto.input';
import { DtoOutputInterceptor } from 'src/common/interceptors/dto-output.interceptor';
// import { CreateUserDtoOutput } from 'src/dtos/create-user/create-user.dto.output';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  // En caso de requerir una transformación en la respuesta se usa un Dto
  // @UseInterceptors(new DtoOutputInterceptor(CreateUserDtoOutput))
  @UseInterceptors(new DtoOutputInterceptor())
  registerUser(@Body() createUserDtoInput: CreateUserDtoInput) {
    return this.authService.registerUser(createUserDtoInput);
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
