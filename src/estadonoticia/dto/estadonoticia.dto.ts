import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class EstadoNoticiaDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  noticias?: string[];
}

export class CreateEstadoNoticiaDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdateEstadoNoticiaDto extends PartialType(CreateEstadoNoticiaDto) {}
