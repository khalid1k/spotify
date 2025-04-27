import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { createUserDto } from '../user/dto/createUser.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { jwtAuthGuard } from './jwtAuthGuard';
@Controller('auth')
export class AuthController {
    constructor(
        private userServices: UserService,
        private authServices: AuthService,
    ) {}

    @Post('signup')
    singup(@Body() createUserDto: createUserDto): Promise<Omit<User, "password">> {
        return this.userServices.create(createUserDto)
    }
    @Post("login")
    login(@Body() loginDto: LoginDto){
        return this.authServices.login(loginDto);
    }
    @Get('token')
    @UseGuards(jwtAuthGuard)
    getProfile(@Request() req,) {
        return req.user;
    }
}
