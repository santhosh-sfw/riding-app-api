import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import {
  IsPhoneNumberFormat,
  IsPhoneNumberLength,
} from 'src/validation/phone.number.validator';

export class CreateContactDto {
  @IsNumber()
  userId: number;

  @IsString()
  @MinLength(2, { message: 'firstName must have atleast 2 characters.' })
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(1, { message: 'lastName must have atleast 1 characters.' })
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumberLength()
  @IsPhoneNumberFormat()
  phoneNumber: string;
}
