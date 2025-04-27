import { Injectable, ParseUUIDPipe, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcryptjs";
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from '../artist/artist.service';
import { payloadType } from 'src/common/types/payload.type';
@Injectable()
export class AuthService {
    constructor(private userServices: UserService,
        private jwtService: JwtService,
        private artistService: ArtistService,
    ) {}

    async login(loginDto: LoginDto): Promise<{accessToken: string}> {
        const user = await this.userServices.findOne(loginDto);
        const artist = await this.artistService.findArtist(user.id);
        const passwordMatched = await bcrypt.compare(loginDto.password, user.password);
        if(passwordMatched){
            const payload: payloadType = {email: user.email, userId: user.id};
            if(artist){
                payload.artistId = artist.id;
            }
            return {
                accessToken: this.jwtService.sign(payload, {secret: process.env.JWT_SECRET})
            }

        }else{
            throw new UnauthorizedException("password dosen't match!")
        }
    }
}
