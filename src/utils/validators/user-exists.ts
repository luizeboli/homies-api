import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IUsersRepository } from 'src/users/interfaces/users-repository.interface';
import { REPOSITORIES } from '../constants/app';
import { Inject } from '@nestjs/common';

@ValidatorConstraint({ async: true })
export class IsExistingUser implements ValidatorConstraintInterface {
  constructor(
    @Inject(REPOSITORIES.USERS)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async validate(user: string) {
    const foundUser = await this.usersRepository.findOne({ id: user });
    if (!foundUser) return false;

    return true;
  }
}

export function UserExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExistingUser,
    });
  };
}
