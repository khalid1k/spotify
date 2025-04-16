import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { createSongDto } from './dto/create-songs.dto';
import { updateSongDto } from './dto/updateSong.dto';
import { UpdateResult } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepo: Repository<Song>,
  ) {}

  async createSong(songDto: createSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    song.artists = songDto.artists;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releasedDate = songDto.releasedDate;

    return await this.songRepo.save(song);
  }

  async findAll(): Promise<Song[]> {
    return this.songRepo.find();
  }

  async getById(id: number): Promise<Song | null> {
    return this.songRepo.findOneBy({ id });
  }

  async removeById(id: number): Promise<any> {
    return this.songRepo.delete(id);
  }
  async updateSongById(
    id: number,
    updateData: updateSongDto,
  ): Promise<UpdateResult> {
    return await this.songRepo.update(id, updateData);
  }
  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepo.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return paginate<Song>(queryBuilder, options);
  }
}
