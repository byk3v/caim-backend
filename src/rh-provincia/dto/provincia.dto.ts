import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class ProvinciaDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  municipios?: string[];
}

export class CreateProvinciaDto {
  @IsString()
  nombre: string;
}

export class UpdateProvinciaDto extends PartialType(CreateProvinciaDto) {}
