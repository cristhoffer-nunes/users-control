import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async existEmail(email: string) {
    const existUser = this.users.find((user) => user.email === email);

    return existUser !== undefined;
  }

  private findById(id: string) {
    const possibleUser = this.users.find((user) => user.id === id);

    if (!possibleUser) {
      throw new Error('User not exist');
    }

    return possibleUser;
  }

  async update(id: string, dataUpdate: Partial<UserEntity>) {
    const user = this.findById(id);

    Object.entries(dataUpdate).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async delete(id: string) {
    const user = this.findById(id);

    this.users = this.users.filter((userSaved) => userSaved.id !== id);

    return user;
  }
}
