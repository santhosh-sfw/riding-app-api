import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import {
  IsPhoneNumberFormat,
  IsPhoneNumberLength,
} from '../../validation/phone.number.validator';
import { FuelType, VehicleType } from '../entities/driver.entity';

export class CreateDriverDto {
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
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumberLength()
  @IsPhoneNumberFormat()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsEnum(VehicleType)
  type: VehicleType;

  @IsEnum(FuelType)
  fuelType: FuelType;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsBoolean()
  available: boolean;
}
