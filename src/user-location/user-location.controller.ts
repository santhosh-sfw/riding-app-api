import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserLocationService } from './user-location.service';
import { CreateUserLocationDto } from './dto/create-user-location.dto';
import { UpdateUserLocationDto } from './dto/update-user-location.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { UserLocation } from './entities/user-location.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('userLocation')
export class UserLocationController {
  constructor(private readonly userLocationService: UserLocationService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createUserLocationDto: CreateUserLocationDto,
  ): Promise<ResponseDto> {
    try {
      const data = await this.userLocationService.create(createUserLocationDto);

      return {
        success: true,
        message: 'User location created succesfully',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while creating user location',
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<ResponseDto> {
    try {
      const data = await this.userLocationService.findAll();
      return {
        success: true,
        message: 'Get all user locations',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching user location data',
        data: null,
      };
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto> {
    try {
      const data = await this.userLocationService.findOne(+id);
      if (data) {
        return {
          success: true,
          message: 'location retrieved successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          message: 'location not found given id',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching user location data',
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserLocationDto: UpdateUserLocationDto,
  ): Promise<ResponseDto> {
    try {
      const data = await this.userLocationService.update(
        +id,
        updateUserLocationDto,
      );
      if (data) {
        return {
          success: true,
          message: 'location updated successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          message: 'location not updated',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while updating user location data',
        data: null,
      };
    }
  }

  //   @Delete(':id')
  //  async remove(@Param('id') id: string, Body() location: UserLocation) {
  //  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Body() location: UserLocation) {
    const result = await this.userLocationService.softDeleteLocation(+id);

    if (!result) {
      throw new NotFoundException('location not found');
    }

    return { message: 'location has been soft deleted.' };
  }
}
