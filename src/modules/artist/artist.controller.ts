import { Body, Controller, Post } from '@nestjs/common';
import { createArtistDto } from './dto/create.artist.dto';
import { ArtistService } from './artist.service';
@Controller('artist')
export class ArtistController {
    constructor(
        private artistService: ArtistService,
    ) {}

    @Post()
    createArtist(@Body() createArtistDto: createArtistDto){
        return this.artistService.createArtist(createArtistDto);
    }
}
