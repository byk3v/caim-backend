import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class RacialidadDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  whitejournalist: string;

  @IsString()
  blackjournalist: string;

  @IsString()
  halfbloodjournalist: string;

  @IsString()
  whiteguest: string;

  @IsString()
  blackguest: string;

  @IsString()
  halfbloodguest: string;

  noticias?: string[];
}

export class CreateRacialidadDto {
    @IsString()
    whitejournalist: string;
  
    @IsString()
    blackjournalist: string;
  
    @IsString()
    halfbloodjournalist: string;
  
    @IsString()
    whiteguest: string;
  
    @IsString()
    blackguest: string;
  
    @IsString()
    halfbloodguest: string;
}

export class UpdateRacialidadDto extends PartialType(CreateRacialidadDto) {}
