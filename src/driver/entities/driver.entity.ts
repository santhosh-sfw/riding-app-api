import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum VehicleType {
  CAR = 'car',
  BIKE = 'bike',
}

export enum FuelType {
  EV = 'ev',
  PETROL = 'petrol',
  DIESEL = 'diesel',
}

@Entity()
export class Driver {
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

  @Column({ type: 'varchar', length: 30 })
  licenseNumber: string;

  @Column({ type: 'varchar' })
  make: string;

  @Column({ type: 'varchar' })
  model: string;

  @Column({
    type: 'enum',
    enum: VehicleType,
  })
  type: VehicleType;

  @Column({
    type: 'enum',
    enum: FuelType,
  })
  fuelType: FuelType;

  @Column({ type: 'varchar' })
  registrationNumber: string;

  @Column()
  available: boolean; // Indicates if the driver is available for rides

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
