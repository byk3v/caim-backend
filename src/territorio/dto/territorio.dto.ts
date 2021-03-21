import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class TerritorioDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  noticias?: string[];
}

export class CreateTerritorioDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdateTerritorioDto extends PartialType(CreateTerritorioDto) {}
