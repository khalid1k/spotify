import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CatsService } from './cats.service';
@Controller('cats')
export class CatsController {
  constructor(private catServices: CatsService) {}

  @Get()
  getAllCats() {
    try {
      this.catServices.findAllCats();
    } catch (e) {
      throw new HttpException(
        'server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }
}
