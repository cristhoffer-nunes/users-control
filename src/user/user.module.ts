import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { IsUniqueEmailValidaton } from 'src/validations/is-unique-email.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, IsUniqueEmailValidaton],
})
export class UserModule {}
