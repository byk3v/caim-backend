import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class DeporteDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  noticias?: string[];
}

export class CreateDeporteDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdateDeporteDto extends PartialType(CreateDeporteDto) {}
