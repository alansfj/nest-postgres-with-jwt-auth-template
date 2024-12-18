import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsNotBlank()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  password: string;
}
