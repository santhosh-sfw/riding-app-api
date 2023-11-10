import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ResponseDto } from './dto/user-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

//  in our case our base URL is http://localhost:3000/api/v1/user

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService
    ) {}
    

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponseDto> {
    const { email, phoneNumber } = createUserDto;

    if (await this.userService.EmailExist(email)) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    if (await this.userService.PhoneNumberExist(phoneNumber)) {
      throw new HttpException(
        'Phone number already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = await this.userService.createUser(createUserDto);

    return {
      success: true,
      message: 'User created Sucessfull',
      data: data,
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<ResponseDto> {
    try {
      const data = await this.userService.findAllUser();
      return {
        success: true,
        message: 'Get all users',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching user data',
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto> {
    try {
      const data = await this.userService.viewUser(+id);

      if (data) {
        return {
          success: true,
          message: 'User retrieved successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          message: 'User not found',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching data',
        data: null,
      };
    }
  }
  @UseGuards(AuthGuard)
  @Get('contacts/:id')
  async findContactByUserId(@Param('id') id: string): Promise<ResponseDto> {
    try {
      const data = await this.userService.findByUserId(+id);

      if (data) {
        return {
          success: true,
          message: 'contacts retrieved successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          message: 'Contact not found',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching data',
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseDto> {
    const { email, phoneNumber } = updateUserDto;

    if (await this.userService.doesEmailExist(email, +id)) {
      throw new HttpException(
        {
          success: false,
          message: 'Email already exists',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (await this.userService.doesPhoneNumberExist(phoneNumber, +id)) {
      throw new HttpException(
        {
          success: false,
          message: 'Phone number already exists',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const data = await this.userService.updateUser(+id, updateUserDto);
      if (data) {
        return {
          success: true,
          message: 'User updated successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          message: 'User not updated',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while updating user',
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Body() user: User) {
    // Perform the soft delete operation
    const result = await this.userService.softDeleteUser(+id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return { message: 'User has been soft deleted.' };
  }
}
