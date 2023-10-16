import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async doesEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user; // Returns true if user exists, false otherwise
  }

  async doesPhoneNumberExist(phoneNumber: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    return !!user; // Returns true if user exists, false otherwise
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

  
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}