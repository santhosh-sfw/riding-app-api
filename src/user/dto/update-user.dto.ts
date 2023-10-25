import {
    IsEmail,
    IsNumber,
    IsNotEmpty,
    IsString,
    MinLength,
    Matches,
    IsBoolean,
  } from 'class-validator';

  import { IsPhoneNumberFormat,IsPhoneNumberLength } from "../../validation/phone.number.validator";
  import { ApiProperty } from '@nestjs/swagger';

  
  export class UpdateUserDto {
    
    @ApiProperty({
      example: 'Praveen',
      required: true
   })
    @IsString()
    @MinLength(2, { message: 'firstName must have atleast 2 characters.' })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
      example: 'Kumar',
      required: true
   })
    @IsString()
    @MinLength(1, { message: 'lastName must have atleast 1 characters.' })
    @IsNotEmpty()
    lastName: string;
  
   
    @ApiProperty({
      example: 'Praveenjr11@gmail.com',
      required: true
   })
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide valid Email.' })
    email: string;
  
    @ApiProperty({
      example: '9876543210',
      required: true
   })
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumberFormat()
    @IsPhoneNumberLength()
    phoneNumber: string;
  
    // @IsNotEmpty()
    @ApiProperty({
      example: '0.0120.001',
      required: true
   })
    @IsNumber()
    lat: number;

    // @IsNotEmpty()
    @ApiProperty({
      example: '0.0120.001',
      required: true
   })
    @IsNumber()
    lan: number;

    @ApiProperty({
      example: 'Coimbatore',
      required: true
   })
    @IsString()
    city:string;

    @ApiProperty({
      example: 'Tamil Nadu',
      required: true
   })
    @IsString()
    state:string;

    @ApiProperty({
      example: '641018',
      required: true
   })
    @IsString()
    @IsNotEmpty({ message: 'Pin code is required' })
    @Matches(/^[1-9][0-9]{5}$/, { message: 'Invalid pin code format' })
    pinCode:string;

    @ApiProperty({
      example: '2/6, Race course',
      required: true
   })
    @IsString()
    addressLine1:string;

    @ApiProperty({
      example: 'Race course',
      required: true
   })
    @IsString()
    addressLine2:string;

    

  }