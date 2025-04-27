import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { AuthConstants } from './auth.constant';
import { JWTStrategy } from './jwt.strategy';
import { jwtAuthGuard } from './jwtAuthGuard';
import { ArtistModule } from '../artist/artist.module';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../artist/entities/artist.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Artist]),UserModule, ArtistModule, JwtModule.register({secret: process.env.JWT_SECRET, signOptions: {expiresIn: '1d'}})],
  controllers: [AuthController],
  providers: [AuthService, UserService, ArtistService, JwtService, JWTStrategy, jwtAuthGuard]
})
export class AuthModule {}
