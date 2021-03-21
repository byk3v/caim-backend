import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class GeneroPeriodisticoDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  noticias?: string[];
}

export class CreateGeneroPeriodisticoDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdateGeneroPeriodisticoDto extends PartialType(CreateGeneroPeriodisticoDto) {}
