import {
    IsEmail,
    IsNumber,
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';
import { isFloat32Array } from 'util/types';
  
//   const passwordRegEx =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
  
  export class UpdateUserDto {
    @IsString()
    @MinLength(2, { message: 'firstName must have atleast 2 characters.' })
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @MinLength(2, { message: 'lastName must have atleast 2 characters.' })
    @IsNotEmpty()
    lastName: string;
  
   
    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;
  
    @IsNotEmpty()
    phoneNumber: string;
  
    @IsNotEmpty()
    @IsNumber()
    lat: number;

    @IsNotEmpty()
    @IsNumber()
    lan: number;

    @IsString()
    city:string;

    @IsString()
    state:string;

    @IsNumber()
    pinCode:string;

    @IsString()
    addressLine1:string;

    @IsString()
    addressLine2:string;

    @IsString()
    addressLine3:string;

  
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