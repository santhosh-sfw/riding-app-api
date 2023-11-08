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
import { ApiTags } from '@nestjs/swagger';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { ResponseDto } from 'src/user/dto/user-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

//  in our case our base URL is http://localhost:3000/api/v1/user

@ApiTags('Driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createDriver(
    @Body() createDriverDto: CreateDriverDto,
  ): Promise<ResponseDto> {
    const { email, phoneNumber, licenseNumber } = createDriverDto;

    if (!createDriverDto.licenseNumber) {
      throw new Error('License number is required.');
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

    const data = await this.driverService.createDriver(createDriverDto);

    return {
      success: true,
      message: 'Driver created Sucessfull',
      data: data,
    };
    // return this.driverService.createDriver(createDriverDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<ResponseDto> {
    try {
      const data = await this.driverService.findAllDriver();
      return {
        success: true,
        message: 'Get all driver',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching driver data',
        data: null,
      };
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.driverService.viewDriver(+id);
  // }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto> {
    try {
      const data = await this.driverService.viewDriver(+id);

      if (data) {
        return {
          success: true,
          message: 'Driver retrieved successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          message: 'Driver not found',
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
    @Body() updateDriverDto: UpdateDriverDto,
  ): Promise<ResponseDto> {
    const { email, phoneNumber } = updateDriverDto;

    if (await this.driverService.doesEmailExist(email, +id)) {
      throw new HttpException(
        {
          success: false,
          message: 'Email already exists',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (await this.driverService.doesPhoneNumberExist(phoneNumber, +id)) {
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
      const data = await this.driverService.updateDriver(+id, updateDriverDto);

      if (data) {
        return {
          success: true,
          message: 'Driver updated successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          message: 'Driver not updated',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while updating driver',
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Body() driver: Driver) {
    // Perform the soft delete operation
    const result = await this.driverService.softDeleteDriver(+id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return { message: 'User has been soft deleted.' };
  }
}
