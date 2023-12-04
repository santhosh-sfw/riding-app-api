import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

  ) {}
  create(createContactDto: CreateContactDto): Promise<Contact> {
    const { userId, firstName, lastName, phoneNumber } = createContactDto;
    const contact: Contact = new Contact();
    (contact.userId = userId),
      (contact.firstName = firstName),
      (contact.lastName = lastName),
      (contact.phoneNumber = phoneNumber);

    return this.contactRepository.save(contact);
  }

  findAll() {
    return this.contactRepository.find();
  }

  findOne(id: number) {
    return this.contactRepository.findOneBy({ id });
  }

  update(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
    const { userId, firstName, lastName, phoneNumber } = updateContactDto;
    const contact: Contact = new Contact();
    (contact.userId = userId),
      (contact.firstName = firstName),
      (contact.lastName = lastName),
      (contact.phoneNumber = phoneNumber);
    return this.contactRepository.save(contact);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} contact`;
  // }

  async softDeleteLocation(id: number): Promise<boolean> {
    const location = await this.contactRepository.findOne({ where: { id } });

    if (!location) {
      return false;
    }
    location.deletedAt = new Date();
    await this.contactRepository.save(location);
    return true;
  }
  
}
