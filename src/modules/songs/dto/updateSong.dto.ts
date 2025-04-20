import {
  IsArray,
  IsString,
  IsMilitaryTime,
  IsOptional,
  IsDateString,
  IsNumber,
} from 'class-validator';
export class updateSongDto {
  @IsString()
  @IsOptional()
  readonly tilte;

  @IsOptional()
  @IsNumber(
    {},
    {
      each: true,
    },
  )
  readonly artists: number[];

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
