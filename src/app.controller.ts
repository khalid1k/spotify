import { Controller, Get, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { jwtAuthGuard } from './modules/auth/jwtAuthGuard';
import { UseGuards } from '@nestjs/common';
@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
@UseGuards(jwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req,){
    console.log("request data is ", req.user);
    return req.user;
  }

}
