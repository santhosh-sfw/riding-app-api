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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

//  in our case our base URL is http://localhost:3000/api/v1/user

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
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

    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.viewUser(+id);
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { email, phoneNumber } = updateUserDto;

    if (await this.userService.doesEmailExist(email, +id)) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    if (await this.userService.doesPhoneNumberExist(phoneNumber, +id)) {
      throw new HttpException(
        'Phone number already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userService.updateUser(+id, updateUserDto);
  }

  

  @Delete(':id')
  async remove(@Param('id') id: string, @Body() user: User) {
    const { isDeleted } = user;

    if (isDeleted !== true) {
      throw new BadRequestException('Invalid soft delete request.');
    }

    // Perform the soft delete operation
    const result = await this.userService.softDeleteUser(+id, isDeleted);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return { message: 'User has been soft deleted.' };
  }
}
