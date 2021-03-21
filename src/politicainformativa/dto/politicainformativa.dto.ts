import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class PoliticaInformativaDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  noticias?: string[];
}

export class CreatePoliticaInformativaDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdatePoliticaInformativaDto extends PartialType(CreatePoliticaInformativaDto) {}
