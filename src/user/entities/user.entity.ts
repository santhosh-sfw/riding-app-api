import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

// import * as bcrypt from 'bcrypt';
import { UserLocation } from 'src/user-location/entities/user-location.entity';
import { Contact } from 'src/contact/entities/contact.entity';

@Entity()
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  firstName: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  phoneNumber: string;

  @Column({ type: 'float' })
  lat: number;

  @Column({ type: 'float' })
  lan: number;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'varchar' })
  pinCode: string;

  @Column({ type: 'varchar' })
  addressLine1: string;

  @Column({ type: 'varchar' })
  addressLine2: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToMany(() => UserLocation, (location) => location.user)
  locations: Location[];

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];
}
