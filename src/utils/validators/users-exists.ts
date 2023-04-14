import clerkClient from '@clerk/clerk-sdk-node';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function UsersExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsExistingUser',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [{ async: true }],
      validator: {
        validate: async (usernames: string[]) => {
          const foundUsers = await clerkClient.users.getUserList({
            username: usernames,
          });

          if (foundUsers.length === usernames.length) return true;

          return false;
        },
      },
    });
  };
}
