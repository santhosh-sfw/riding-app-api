import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPhoneNumberFormat', async: false })
export class IsPhoneNumberFormatConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, _args: ValidationArguments) {
    // Implement custom validation logic for the phone number format here
    // Return true if the format is valid, or false if it's not
    return /^(\+\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/.test(value);
  }
}

export function IsPhoneNumberFormat() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumberFormat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Invalid phone number format',
      },
      validator: IsPhoneNumberFormatConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isPhoneNumberLength', async: false })
export class IsPhoneNumberLengthConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, _args: ValidationArguments) {
    // Implement custom validation logic for a 10-digit phone number here
    // Return true if the length is valid, or false if it's not
    return /^\d{10}$/.test(value);
  }
}

export function IsPhoneNumberLength() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumberLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Phone number must be exactly 10 digits',
      },
      validator: IsPhoneNumberLengthConstraint,
    });
  };
}
