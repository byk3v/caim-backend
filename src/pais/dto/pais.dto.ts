import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class PaisDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  noticias?: string[];
}

export class CreatePaisDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdatePaisDto extends PartialType(CreatePaisDto) {}
