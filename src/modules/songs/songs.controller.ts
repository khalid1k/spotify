import {
  Controller,
  Post,
  Get,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Query,
  DefaultValuePipe,
  UseGuards,
  Request
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { createSongDto } from './dto/create-songs.dto';
import { updateSongDto } from './dto/updateSong.dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Song } from './entities/song.entity';
import { jwtAuthGuard } from '../auth/jwtAuthGuard';
import { JwtArtistGuard } from '../auth/artistJwtGuard';
@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  @UseGuards(jwtAuthGuard)
  @UseGuards(JwtArtistGuard)
  create(@Body() createSongDto: createSongDto, @Request() req) {
    console.log("user from the song controller is ", req.user);
    return this.songsService.createSong(createSongDto);
  }

  @Get()
  @UseGuards(jwtAuthGuard)
  getAll() {
    try {
      return this.songsService.findAll();
    } catch (e) {
      throw new HttpException(
        'server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }
  @Get(':id')
  @UseGuards(jwtAuthGuard)
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.songsService.getById(id);
  }
  @Delete(':id')
  deleteOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.songsService.removeById(id);
  }
  @Put(':id')
  updateOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateData: updateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.updateSongById(id, updateData);
  }

  @Get('all')
  getAllSongs(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({ page, limit });
  }

}
