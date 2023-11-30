import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { Contact } from './entities/contact.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createContactDto: CreateContactDto,
  ): Promise<ResponseDto> {
    try {
      const data = await this.contactService.create(createContactDto);

      return {
        success: true,
        message: 'contact created succesfully',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while creating contact',
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<ResponseDto> {
    try {
      const data = await this.contactService.findAll();
      return {
        success: true,
        message: "Get all contact's",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching contact data',
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto> {
    try {
      const data = await this.contactService.findOne(+id);
      if (data) {
        return {
          success: true,
          message: 'contact retrieved successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          message: 'contact not found given id',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching contact data',
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<ResponseDto> {
    try {
      const data = await this.contactService.update(+id, updateContactDto);
      if (data) {
        return {
          success: true,
          message: 'contact updated successfully',
          data: data,
        };
      } else {
        return {
          success: false,
          message: 'contact not updated',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while updating contact data',
        data: null,
      };
    }
  }

  

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Body() Contact: Contact) {
    const result = await this.contactService.softDeleteLocation(+id);
    if (!result) {
      throw new NotFoundException('contact not found');
    }

    return { message: 'contact has been soft deleted.' };
  }
}
