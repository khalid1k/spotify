import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  findAllCats() {
    // console.log('this function get all the cats');
    throw new Error('internal server error to test the error handling');
  }
}
