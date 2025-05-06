import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { createUserDto } from '../user/dto/createUser.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { jwtAuthGuard } from './jwtAuthGuard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private userServices: UserService,
        private authServices: AuthService,
    ) {}

    @Post('signup')
    @ApiOperation({summary: 'Register new User'})
    @ApiResponse({
        status: 201,
        description: 'It will return the user in the response',
      })

    singup(@Body() createUserDto: createUserDto): Promise<Omit<User, "password">> {
        return this.userServices.create(createUserDto)
    }


    @Post("login")
    @ApiOperation({summary: "Login User"})
    @ApiResponse({
        status: 200,
        description: "it will give you the access token in the response"
    })
    login(@Body() loginDto: LoginDto){
        return this.authServices.login(loginDto);
    }


    @Get('token')
    @UseGuards(jwtAuthGuard)
    getProfile(@Request() req,) {
        return req.user;
    }
}
