import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { createPlayListDto } from './dto/createPlaylist.dto';
import { Playlist } from './entities/playlist.entity';

@Controller('playlist')
export class PlaylistController {
    constructor(
        private playListService: PlaylistService
    ){}

    @Post()
    create(@Body() playListDto: createPlayListDto): Promise<Playlist> {
        return this.playListService.create(playListDto);
    }
}
