import { Injectable } from '@nestjs/common';
import { CreateUserLocationDto } from './dto/create-user-location.dto';
import { UpdateUserLocationDto } from './dto/update-user-location.dto';
import { UserLocation } from './entities/user-location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserLocationService {
  constructor(
    @InjectRepository(UserLocation)
    private readonly userLocationRepository: Repository<UserLocation>,
  ) {}

  create(createUserLocationDto: CreateUserLocationDto) {
    const {
      userId,
      lat,
      lan,
      city,
      state,
      pinCode,
      addressLine1,
      addressLine2,
    } = createUserLocationDto;

    const location = new UserLocation();
    location.userId = userId;
    location.lat = lat;
    location.lan = lan;
    location.addressLine1 = addressLine1;
    location.addressLine2 = addressLine2;
    location.pinCode = pinCode;
    location.city = city;
    location.state = state;

    return this.userLocationRepository.save(location);
  }

  findAll(): Promise<UserLocation[]> {
    return this.userLocationRepository.find();
  }

  findOne(id: number): Promise<UserLocation> {
    return this.userLocationRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateUserLocationDto: UpdateUserLocationDto,
  ): Promise<UserLocation> {
    const location: UserLocation = new UserLocation();
    (location.id = updateUserLocationDto.userId),
      (location.lan = updateUserLocationDto.lan),
      (location.lat = updateUserLocationDto.lat),
      (location.addressLine1 = updateUserLocationDto.addressLine1),
      (location.addressLine2 = updateUserLocationDto.addressLine2),
      (location.pinCode = updateUserLocationDto.pinCode),
      (location.city = updateUserLocationDto.city),
      (location.state = updateUserLocationDto.state);

    return this.userLocationRepository.save(location);
  }

  remove(id: number) {
    return `This action removes a #${id} userLocation`;
  }

  async softDeleteLocation(id: number): Promise<boolean> {
    const location = await this.userLocationRepository.findOne({
      where: { id },
    });

    if (!location) {
      return false;
    }
    // if (isDeleted) {
    //   // Set the isDeleted flag to true
    //   location.isDeleted = true;
    //   // Set the deletedAt timestamp to the current time
    //   location.deletedAt = new Date();
    // } else {
    //   location.isDeleted = false;
    //   location.deletedAt = null;
    // }
    location.deletedAt = new Date();
    await this.userLocationRepository.save(location);
    return true;
  }
}
