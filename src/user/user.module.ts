import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
})
export class UserModule {}
