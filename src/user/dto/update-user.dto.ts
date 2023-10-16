import {
    IsEmail,
    IsNumber,
    IsNotEmpty,
    IsString,
    MinLength,
    Matches,
  } from 'class-validator';

  import { IsPhoneNumberFormat,IsPhoneNumberLength } from "../../validation/phone.number.validator";

  
  export class UpdateUserDto {
    
    @IsString()
    @MinLength(2, { message: 'firstName must have atleast 2 characters.' })
    @IsNotEmpty()
    firstName: string;

    @IsString()
    // @MinLength(2, { message: 'lastName must have atleast 2 characters.' })
    @IsNotEmpty()
    lastName: string;
  
   
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide valid Email.' })
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumberFormat()
    @IsPhoneNumberLength()
    phoneNumber: string;
  
    // @IsNotEmpty()
    @IsNumber()
    lat: number;

    // @IsNotEmpty()
    @IsNumber()
    lan: number;

    @IsString()
    city:string;

    @IsString()
    state:string;

    @IsString()
    @IsNotEmpty({ message: 'Pin code is required' })
    @Matches(/^[1-9][0-9]{5}$/, { message: 'Invalid pin code format' })
    pinCode:string;

    @IsString()
    addressLine1:string;

    @IsString()
    addressLine2:string;

  }