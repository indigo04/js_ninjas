import { ArrayNotEmpty, IsArray, IsNumber, IsString } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  nickname: string;

  @IsString()
  real_name: string;

  @IsString()
  origin_description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  superpowers: string[];

  @IsString()
  catch_phrase: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];
}

export class UpdateHeroDto {
  @IsNumber()
  id: number;

  @IsString()
  nickname: string;

  @IsString()
  real_name: string;

  @IsString()
  origin_description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  superpowers: string[];

  @IsString()
  catch_phrase: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];
}

export class RemoveHeroDTO {
  @IsString()
  id: string;
}
