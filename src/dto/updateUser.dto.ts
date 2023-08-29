import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsUniqueEmail } from 'src/validations/is-unique-email.validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsUniqueEmail({ message: 'Email already exists' })
  @IsOptional()
  email: string;

  @MinLength(6)
  @IsOptional()
  password: string;
}
