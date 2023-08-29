/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueEmailValidaton implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(
    value: any,
    _ValidationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userExist = await this.userRepository.existEmail(value);

    return !userExist;
  }
}

export const IsUniqueEmail = (optionsValidations: ValidationOptions) => {
  return (obj: object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: optionsValidations,
      constraints: [],
      validator: IsUniqueEmailValidaton,
    });
  };
};
