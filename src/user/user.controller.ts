import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { validate } from 'class-validator';
import { Console } from 'console';


  
  /**
   * whatever the string pass in controller decorator it will be appended to
   * API URL. to call any API from this controller you need to add prefix which is
   * passed in controller decorator.
   * in our case our base URL is http://localhost:3000/api/v1/user
   */
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
      // return this.userService.createUser(createUserDto);

      const errors = await validate(createUserDto);

      const { email, phoneNumber } = createUserDto;

      if (await this.userService.doesEmailExist(email)) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      
      if (await this.userService.doesPhoneNumberExist(phoneNumber)) {
        throw new HttpException('Phone number already exists', HttpStatus.BAD_REQUEST);
      }
      

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => Object.values(error.constraints));
      throw new HttpException(errorMessages, HttpStatus.BAD_REQUEST);
    }

    }

    
@Get()
findAll() {
  return this.userService.findAllUser();
}


@Get(':id')
findOne(@Param('id') id: string) {
  return this.userService.viewUser(+id);
}


@Patch(':id')
update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  return this.userService.updateUser(+id, updateUserDto);
}


@Delete(':id')
remove(@Param('id') id: string) {
  return this.userService.removeUser(+id);
}
  
    
  }