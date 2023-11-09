import { Module } from '@nestjs/common';
import { UserLocationService } from './user-location.service';
import { UserLocationController } from './user-location.controller';
import { UserLocation } from './entities/user-location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserLocation])],
  controllers: [UserLocationController],
  providers: [UserLocationService],
})
export class UserLocationModule {}
