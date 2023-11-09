import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseDto } from 'src/user/dto/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body('phoneNumber') phoneNumber: string) {
    const phoneRegex = /^[0-9]*$/; // This regex allows only numbers

    if (!phoneRegex.test(phoneNumber)) {
      return {
        success: false,
        message: 'Invalid phone number format',
      };
    }

    const token = await this.authService.signInWithPhoneNumber(phoneNumber);
    if (!token) {
      return {
        success: false,
        message: 'Invalid phone number',
      };
    }
    return {
      success: true,
      message: 'Login Sucessfull',
      token: token,
    };
  }
}
