import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class CategoriaDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  codigo: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  noticias?: string[];
}

export class CreateCategoriaDto {
  @IsString()
  codigo: string;
  
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}
