import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class TipoContratoDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  contratos?: string[];
}

export class CreateTipoContratoDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdateTipoContratoDto extends PartialType(CreateTipoContratoDto) {}
