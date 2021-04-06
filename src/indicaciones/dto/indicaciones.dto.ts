import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class IndicacionesDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  texto: string;

  @IsString()
  activa: string;

  @IsString()
  emisorId: string;

  @IsString()
  receptorId: string;

  @IsString()
  rolId: string;
}

export class CreateIndicacionesDto {
    @IsString()
    texto: string;
  
    @IsString()
    activa: string;
  
    @IsString()
    emisorId: string;
  
    @IsString()
    receptorId: string;
  
    @IsString()
    rolId: string;
}

export class UpdateIndicacionesDto extends PartialType(CreateIndicacionesDto) {}
