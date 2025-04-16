import {
  IsArray,
  IsString,
  IsMilitaryTime,
  IsOptional,
  IsDateString,
} from 'class-validator';
export class updateSongDto {
  @IsString()
  @IsOptional()
  readonly tilte;

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  readonly artists;

  @IsDateString()
  @IsOptional()
  readonly releaselDate: Date;

  @IsMilitaryTime()
  @IsOptional()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
