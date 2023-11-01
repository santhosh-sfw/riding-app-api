import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Driver } from './driver/entities/driver.entity';
import { DriverModule } from './driver/driver.module';
import { AuthModule } from './auth/auth.module';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'Demo@123',
      username: 'postgres',
      entities: [User,Driver],
      database: 'ride',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    DriverModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
