import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createPlayListDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true})
    readonly songs: number[]

    @IsNumber()
    @IsNotEmpty()
    readonly user: number;

}