import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { ResponseDto } from './dto/user-response.dto';
import { LoginDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async EmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user; // Returns true if user exists, false otherwise
  }

  async PhoneNumberExist(phoneNumber: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    return !!user; // Returns true if user exists, false otherwise
  }


  async doesEmailExist(email: string, userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email, id: Not(userId) } });
    return !!user; // Returns true if another user with the same email exists, false otherwise
  }
  
  async doesPhoneNumberExist(phoneNumber: string, userId: number): Promise<boolean> {
    const driver = await this.userRepository.findOne({ where: { phoneNumber, id: Not(userId) } });
    return !!driver; // Returns true if another user with the same phone number exists, false otherwise
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.userRepository.findOne({  where: { phoneNumber } } );
  }

  

  
  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.phoneNumber = createUserDto.phoneNumber;
    user.lat = createUserDto.lat;
    user.lan = createUserDto.lan;
    user.addressLine1 = createUserDto.addressLine1;
    user.addressLine2 = createUserDto.addressLine2;
    user.pinCode = createUserDto.pinCode;
    user.city = createUserDto.city;
    user.state = createUserDto.state;
    
    
    return this.userRepository.save(user);
  }

  
  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  
  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
    user.phoneNumber = updateUserDto.phoneNumber;
    user.lat = updateUserDto.lat;
    user.lan = updateUserDto.lan;
    user.addressLine1 = updateUserDto.addressLine1;
    user.addressLine2 = updateUserDto.addressLine2;
    user.pinCode = updateUserDto.pinCode;
    user.city = updateUserDto.city;
    user.state = updateUserDto.state;
    user.id = id;
    return this.userRepository.save(user);
  }


  async softDeleteUser(id: number, isDeleted: boolean): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });
  
    if (!user) {
      return false;
    }
    if (isDeleted) {
      // Set the isDeleted flag to true
      user.isDeleted = true;
      // Set the deletedAt timestamp to the current time
      user.deletedAt = new Date();
    } else {
      user.isDeleted = false;
      user.deletedAt = null;
    }
    await this.userRepository.save(user);
    return true;
  }
  

  

  
  
}