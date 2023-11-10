import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserLocation } from 'src/user-location/entities/user-location.entity';
import { ResponseDto } from 'src/dto/response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserLocation)
    private readonly userLocationRepository: Repository<UserLocation>,
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
    const user = await this.userRepository.findOne({
      where: { email, id: Not(userId) },
    });
    return !!user; // Returns true if another user with the same email exists, false otherwise
  }

  async doesPhoneNumberExist(
    phoneNumber: string,
    userId: number,
  ): Promise<boolean> {
    const driver = await this.userRepository.findOne({
      where: { phoneNumber, id: Not(userId) },
    });
    return !!driver; // Returns true if another user with the same phone number exists, false otherwise
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phoneNumber } });
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

    return this.userRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const userEntity = await transactionalEntityManager.save(User, user);

        const userLocation: UserLocation = new UserLocation();
        userLocation.user = userEntity;
        userLocation.lan = createUserDto.lan;
        userLocation.lat = createUserDto.lat;
        userLocation.addressLine1 = createUserDto.addressLine1;
        userLocation.addressLine2 = createUserDto.addressLine2;
        userLocation.pinCode = createUserDto.pinCode;
        userLocation.city = createUserDto.city;
        userLocation.state = createUserDto.state;

        await transactionalEntityManager.save(UserLocation, userLocation);

        return userEntity;
      },
    );
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  // updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {

  //   const user: User = new User();
  //   user.firstName = updateUserDto.firstName;
  //   user.lastName = updateUserDto.lastName;
  //   user.email = updateUserDto.email;
  //   user.phoneNumber = updateUserDto.phoneNumber;
  //   user.lat = updateUserDto.lat;
  //   user.lan = updateUserDto.lan;
  //   user.addressLine1 = updateUserDto.addressLine1;
  //   user.addressLine2 = updateUserDto.addressLine2;
  //   user.pinCode = updateUserDto.pinCode;
  //   user.city = updateUserDto.city;
  //   user.state = updateUserDto.state;

  //   return this.userRepository.save(user);

  // }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

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

    const updatedUser = await this.userRepository.save(user);

    const userLocation = await this.userLocationRepository.findOne({
      where: { userId: user.id },
    });

    if (userLocation) {
      userLocation.lat = updateUserDto.lat;
      userLocation.lan = updateUserDto.lan;
      userLocation.addressLine1 = updateUserDto.addressLine1;
      userLocation.addressLine2 = updateUserDto.addressLine2;
      userLocation.pinCode = updateUserDto.pinCode;
      userLocation.city = updateUserDto.city;
      userLocation.state = updateUserDto.state;

      await this.userLocationRepository.save(userLocation);
    }

    return updatedUser;
  }


  async softDeleteUser(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return false;
    }
    user.deletedAt = new Date();
    await this.userRepository.save(user);
    return true;
  }


  async findByUserId(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['contacts'],
    });
    
  }


  
  
}
