import { IsString, IsNumber } from 'class-validator';

export class CreateUserLocationDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  lat: number;

  @IsNumber()
  lan: number;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  pinCode: string;

  @IsString()
  addressLine1: string;

  @IsString()
  addressLine2: string;
}
