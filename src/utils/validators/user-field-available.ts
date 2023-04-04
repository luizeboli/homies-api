import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IUsersRepository } from 'src/users/interfaces/users-repository.interface';
import { REPOSITORIES } from '../constants/app';
import { Inject } from '@nestjs/common';

@ValidatorConstraint({ async: true })
export class IsUserFieldAvailable implements ValidatorConstraintInterface {
  constructor(
    @Inject(REPOSITORIES.USERS)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async validate(user: string, args: ValidationArguments) {
    const userField = args.property;

    const foundUser = await this.usersRepository.findOne({
      [userField]: args.value,
    });

    if (foundUser) return false;

    return true;
  }
}

export function UserFieldAvailable(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserFieldAvailable,
    });
  };
}
