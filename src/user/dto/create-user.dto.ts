import {
    IsEmail,
    IsNumber,
    IsNotEmpty,
    IsString,
    MinLength,
    Matches,
  } from 'class-validator';

  import { IsPhoneNumberFormat,IsPhoneNumberLength } from "../../validation/phone.number.validator";
  

  
  // const passwordRegEx =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
  
  export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'firstName must have atleast 2 characters.' })
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @MinLength(2, { message: 'lastName must have atleast 2 characters.' })
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



  
    // @IsNotEmpty()
    // @Matches(passwordRegEx, {
    //   message: `Password must contain Minimum 8 and maximum 20 characters, 
    //   at least one uppercase letter, 
    //   one lowercase letter, 
    //   one number and 
    //   one special character`,
    // })
    // password: string;
  }