import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsNotBlank } from 'src/common/decorators/is-not-blank.decorator.class-validator';

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
