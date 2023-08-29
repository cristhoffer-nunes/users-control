import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsUniqueEmail } from 'src/validations/is-unique-email.validator';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsUniqueEmail({ message: 'Email already exists' })
  email: string;

  @MinLength(6)
  password: string;
}
