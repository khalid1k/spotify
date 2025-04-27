import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createArtistDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    
}