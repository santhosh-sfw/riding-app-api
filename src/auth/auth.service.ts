import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { DriverService } from 'src/driver/driver.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly driverService: DriverService,
  ) {}

 

async signInWithPhoneNumber(phoneNumber: string): Promise<string | null> {
  const user = await this.userService.findByPhoneNumber(phoneNumber);
  const driver = await this.driverService.findByPhoneNumber(phoneNumber);

  if (!user && !driver) {
    return null; 
  }
  if (user) {
    const userPayload = { sub: user.id };
    return this.jwtService.sign(userPayload);
  } else {
    const driverPayload = { sub: driver.id };
    return this.jwtService.sign(driverPayload);
  }
}

  
}
