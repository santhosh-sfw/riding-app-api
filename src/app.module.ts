import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Driver } from './driver/entities/driver.entity';
import { DriverModule } from './driver/driver.module';
import { AuthModule } from './auth/auth.module';
import { config } from 'dotenv';
import { UserLocationModule } from './user-location/user-location.module';
import { UserLocation } from './user-location/entities/user-location.entity';
import { ContactModule } from './contact/contact.module';
import { Contact } from './contact/entities/contact.entity';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User, Driver, UserLocation, Contact],
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    DriverModule,
    AuthModule,
    UserLocationModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
