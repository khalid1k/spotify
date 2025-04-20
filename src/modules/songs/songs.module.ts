import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { Song } from './entities/song.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/entities/artist.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  providers: [SongsService],
  controllers: [SongsController],
})
export class SongsModule {}
