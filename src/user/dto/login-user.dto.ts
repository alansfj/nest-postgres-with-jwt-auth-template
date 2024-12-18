import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsNotBlank()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  password: string;
}
