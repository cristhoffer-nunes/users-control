import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common/decorators';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from 'src/dto/createUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from 'src/dto/listUser.dto';
import { UpdateUserDTO } from 'src/dto/updateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    const userEntity = new UserEntity();

    userEntity.email = data.email;
    userEntity.password = data.password;
    userEntity.name = data.name;
    userEntity.id = uuid();

    await this.userRepository.save(userEntity);
    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'User created succesfully',
    };
  }

  @Get()
  async listUsers() {
    const usersSaved = await this.userRepository.list();
    const usersList = usersSaved.map(
      (users) => new ListUserDTO(users.id, users.name),
    );
    return usersList;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const userUpdated = await this.userRepository.update(id, newData);

    return {
      user: userUpdated,
      message: 'User updated succesfully',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const userDeleted = await this.userRepository.delete(id);

    return {
      user: userDeleted,
      message: 'User deleted succesfully',
    };
  }
}
