import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  
  constructor(
    @InjectRepository(Driver) private  driverRepository: Repository<Driver>,
  ) {}



  async EmailExist(email: string): Promise<boolean> {
    const driver = await this.driverRepository.findOne({ where: { email } });
    return !!driver; // Returns true if user exists, false otherwise
  }

  async PhoneNumberExist(phoneNumber: string): Promise<boolean> {
    const driver = await this.driverRepository.findOne({ where: { phoneNumber } });
    return !!driver; // Returns true if user exists, false otherwise
  }

  async doesEmailExist(email: string, driverId: number): Promise<boolean> {
    const driver = await this.driverRepository.findOne({ where: { email, id: Not(driverId) } });
    return !!driver; // Returns true if another user with the same email exists, false otherwise
  }
  
  async doesPhoneNumberExist(phoneNumber: string, driverId: number): Promise<boolean> {
    const driver = await this.driverRepository.findOne({ where: { phoneNumber, id: Not(driverId) } });
    return !!driver; // Returns true if another user with the same phone number exists, false otherwise
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Driver | undefined> {
    return this.driverRepository.findOne({  where: { phoneNumber } } );

  }
  

  createDriver(createDriverDto : CreateDriverDto) : Promise<Driver> {

    const driver: Driver = new Driver ();
    driver.firstName = createDriverDto.firstName;
    driver.lastName = createDriverDto.lastName;
    driver.email = createDriverDto.email;
    driver.phoneNumber = createDriverDto.phoneNumber;
    driver.licenseNumber = createDriverDto.licenseNumber;
    driver.make = createDriverDto.make;
    driver.model = createDriverDto.model;
    driver.type = createDriverDto.type;
    driver.fuelType = createDriverDto.fuelType;
    driver.registrationNumber = createDriverDto.registrationNumber;
    driver.available = createDriverDto.available;

    return this.driverRepository.save(driver)
  }

  findAllDriver(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  viewDriver(id: number): Promise<Driver> {
    return this.driverRepository.findOneBy({ id });
  }

  updateDriver(id: number,updateDriverDto : UpdateDriverDto): Promise<Driver> {

    const driver:Driver = new Driver();
    driver.firstName = updateDriverDto.firstName;
    driver.lastName = updateDriverDto.lastName;
    driver.email = updateDriverDto.email;
    driver.phoneNumber = updateDriverDto.phoneNumber;
    driver.licenseNumber = updateDriverDto.licenseNumber;
    driver.make = updateDriverDto.make;
    driver.model = updateDriverDto.model;
    driver.type = updateDriverDto.type;
    driver.fuelType = updateDriverDto.fuelType;
    driver.registrationNumber = updateDriverDto.registrationNumber;
    driver.available = updateDriverDto.available;
    driver.id = id;

    return this.driverRepository.save(driver);

}

async softDeleteDriver(id: number , isDeleted : boolean) : Promise<boolean> {

    const driver = await this.driverRepository.findOne({ where : {id} })

    if (!driver) {
        return false;
    }

    if (isDeleted) {
      driver.isDeleted = true;
      driver.deletedAt = new Date();
      
    } else {
      driver.isDeleted = false;
      driver.deletedAt =  null;
    }

    await this.driverRepository.save(driver);
    return true;
}

}