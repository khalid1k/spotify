import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { createArtistDto } from './dto/create.artist.dto';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist)
        private artistRepo: Repository<Artist>,
    ) {}

    findArtist(userId: number): Promise<Artist | null> {
        const artist = this.artistRepo.findOneBy({user: {id: userId}});
        if(!artist){
            throw new BadRequestException("artist dosen't exist");
        }
        return artist;
    }

    createArtist(createArtistDto: createArtistDto): Promise<Artist> {
        return this.artistRepo.save(createArtistDto);
    }
}
