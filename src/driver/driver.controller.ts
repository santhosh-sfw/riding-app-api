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
  import { ApiTags } from '@nestjs/swagger';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
  
  //  in our case our base URL is http://localhost:3000/api/v1/user
  
  @ApiTags('Driver')
  @Controller('driver')
  export class DriverController {
    constructor(private readonly driverService: DriverService) {}
  

    
    @Post()
    async createDriver(@Body() createDriverDto: CreateDriverDto) {
      const { email, phoneNumber, licenseNumber } = createDriverDto;
  
      if (!createDriverDto.licenseNumber) {
        throw new Error("License number is required.");
      }

      if (await this.driverService.EmailExist(email)) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
  
      if (await this.driverService.PhoneNumberExist(phoneNumber)) {
        throw new HttpException(
          'Phone number already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      return this.driverService.createDriver(createDriverDto);
    }
  
    @Get()
    findAll() {
      return this.driverService.findAllDriver();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.driverService.viewDriver(+id);
    }
  
    @Post(':id')
    async update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
     
      const { email, phoneNumber } =updateDriverDto;
  
      if (await this.driverService.doesEmailExist(email,+id)){
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
  
      if (await this.driverService.doesPhoneNumberExist(phoneNumber, +id)) {
        throw new HttpException(
          'Phone number already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      
      return this.driverService.updateDriver(+id,updateDriverDto);
    }

    
  
    
  
    @Delete(':id')
    async remove(@Param('id') id: string, @Body() driver: Driver) {
      const { isDeleted } = driver;
  
      if (isDeleted !== true) {
        throw new BadRequestException('Invalid soft delete request.');
      }
  
      // Perform the soft delete operation
      const result = await this.driverService.softDeleteDriver(+id, isDeleted);
  
      if (!result) {
        throw new NotFoundException('User not found');
      }
  
      return { message: 'User has been soft deleted.' };
    }
  }
  