import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { Song } from '../songs/entities/song.entity';
import { User } from '../user/entities/user.entity';
import { createPlayListDto } from './dto/createPlaylist.dto';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playListRepo: Repository<Playlist>,
        @InjectRepository(Song)
        private songRepo: Repository<Song>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async create(playListDto: createPlayListDto): Promise<Playlist> {
        const playList = new Playlist();
        playList.name = playListDto.name;
        const songs = await this.songRepo.findByIds(playListDto.songs);
        if(!songs){
            throw new BadRequestException("song not found");
        }
        playList.songs = songs;
        const user = await this.userRepo.findOneBy({id: playListDto.user});
        if(!user){
            throw new BadRequestException("user not found");
        }
        playList.user = user;
        return this.playListRepo.save(playList);

    }

    
}
