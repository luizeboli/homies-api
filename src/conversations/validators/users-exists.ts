import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { REPOSITORIES } from '../../utils/constants/app';
import { IUsersRepository } from 'src/users/interface/users-repository.interface';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistingUser implements ValidatorConstraintInterface {
  constructor(
    @Inject(REPOSITORIES.USERS)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async validate(usernames: string[]): Promise<boolean> {
    const foundUsers = await this.usersRepository.findManyByUsername(usernames);

    if (foundUsers.length === usernames.length) return true;

    return false;
  }
}

export function UsersExist(validationOptions?: ValidationOptions) {
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
