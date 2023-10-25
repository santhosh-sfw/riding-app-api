import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { IsPhoneNumberFormat, IsPhoneNumberLength } from "../../validation/phone.number.validator";

export class UpdateDriverDto{
    
    @IsString()
    @MinLength(2, { message: 'firstName must have atleast 2 characters.' })
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @MinLength(1, { message: 'lastName must have atleast 1 characters.' })
    @IsNotEmpty()
    lastName:string;

    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide valid Email.' })
    email:string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumberLength()
    @IsPhoneNumberFormat()
    phoneNumber:string;


    @IsString()
    @IsNotEmpty()
    licenseNumber:string;

    @IsString()
    @IsNotEmpty()
    bikeMake:string;

    @IsString()
    @IsNotEmpty()
    bikeModel:string;

    @IsString()
    @IsNotEmpty()
    bikeRegistrationNumber:string;

    @IsBoolean()
    available:boolean;




}